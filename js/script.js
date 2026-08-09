// ============================
// DOM Elements
// ============================

const form = document.getElementById("blogForm");
const editForm = document.getElementById("editBlogForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");
const image = document.getElementById("image");

const charCount = document.getElementById("charCount");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const contentError = document.getElementById("contentError");
const imageError = document.getElementById("imageError");

const successMessage = document.getElementById("successMessage");

// ============================
// Add Blog Form
// ============================

if (form) {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        let isValid = true;

        // Clear previous messages
        successMessage.textContent = "";
        successMessage.style.display = "none";

        titleError.textContent = "";
        authorError.textContent = "";
        contentError.textContent = "";
        imageError.textContent = "";

        // Title Validation
        if (title.value.trim() === "") {
            titleError.textContent = "Please enter blog title.";
            isValid = false;
        }

        // Author Validation
        if (author.value.trim() === "") {
            authorError.textContent = "Please enter author name.";
            isValid = false;
        }

        // Content Validation
        if (content.value.trim() === "") {
            contentError.textContent = "Content cannot be empty.";
            isValid = false;
        }

        // Image Validation
        if (image && image.files.length === 0) {
            imageError.textContent = "Please upload a cover image.";
            isValid = false;
        }

        if (!isValid) {
            return;
        }


        // ============================
        // Create FormData
        // ============================

        const formData = new FormData();

        formData.append("title", title.value);
        formData.append("author", author.value);
        formData.append("content", content.value);
        formData.append("image", image.files[0]);


        // ============================
        // Send Blog + Image
        // ============================

        try {

            const response = await fetch("/blogs", {

                method: "POST",

                body: formData

            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(data.message || "Failed to create blog.");

            }


            // Success message
            successMessage.textContent = data.message;
            successMessage.style.display = "block";


            // Reset form
            form.reset();


            if (charCount) {
                charCount.textContent = "Characters: 0 / 500";
            }


        } catch (error) {

            console.error("Error:", error);

            successMessage.textContent =
                "Something went wrong. Please try again.";

            successMessage.style.display = "block";

        }

    });

}
// ============================
// Edit Blog Form
// ============================

if (editForm) {

    editForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const blogId = localStorage.getItem("editBlogId");

        const response = await fetch(`/blogs/${blogId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                title: title.value,
                author: author.value,
                content: content.value

            })

        });

        const data = await response.json();

// Show success message
successMessage.textContent = data.message;
successMessage.style.display = "block";

// Clear stored blog id
localStorage.removeItem("editBlogId");

// Redirect after 2 seconds
setTimeout(() => {
    window.location.href = "index.html";
}, 2000);

    });

}

// ============================
// Character Counter
// ============================

if (content) {

    content.addEventListener("input", function () {

        if (content.value.length > 500) {
            content.value = content.value.slice(0, 500);
        }

        if (charCount) {
            charCount.textContent = `Characters: ${content.value.length} / 500`;
        }

    });

}

// ============================
// Load Blogs
// ============================

async function loadBlogs() {

    const response = await fetch("/blogs");
    const blogs = await response.json();

    const container = document.getElementById("blogContainer");

    if (!container) return;

    container.innerHTML = "";

    if (blogs.length === 0) {

        container.innerHTML = `
            <p class="no-blogs">
                No blogs available. Add your first blog!
            </p>
        `;

        return;
    }
blogs.forEach(blog => {

    const maxLength = 150;
    const isLongContent = blog.content.length > maxLength;

    const shortContent = isLongContent
        ? blog.content.substring(0, maxLength) + "..."
        : blog.content;

    const fullContent = encodeURIComponent(blog.content);

    container.innerHTML += `
        <div class="blog-card">

            ${
                blog.image
                ? `<img src="${blog.image}" alt="${blog.title}">`
                : ""
            }

            <div class="card-content">

                <h3>${blog.title}</h3>

                <p class="blog-description">
                    <span id="content-${blog.id}">
                        ${shortContent}
                    </span>
                </p>

                ${
                    isLongContent
                    ? `
                        <button
                            type="button"
                            class="read-more-btn"
                            data-content="${fullContent}"
                            onclick="toggleContent(${blog.id}, this)">
                            Read More
                        </button>
                    `
                    : ""
                }

                <p class="blog-author">
                    <strong>By:</strong> ${blog.author}
                </p>

                <p class="blog-date">
                    ${new Date(blog.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    })}
                </p>

                <div class="blog-actions">

                    <button
                        class="edit-btn"
                        onclick="goToEdit(${blog.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id}, '${blog.title.replace(/'/g, "\\'")}')">
                        Delete
                    </button>

                </div>

            </div>

        </div>
    `;
});
};

// ============================
// Read More / Show Less
// ============================

function toggleContent(id, button) {

    const content = document.getElementById(`content-${id}`);

    const fullContent = decodeURIComponent(
        button.getAttribute("data-content")
    );

    const maxLength = 150;

    if (button.textContent.trim() === "Read More") {

        content.textContent = fullContent;
        button.textContent = "Show Less";

    } else {

        content.textContent =
            fullContent.substring(0, maxLength) + "...";

        button.textContent = "Read More";
    }
}

// ============================
// Load Blogs on Page
// ============================

if (document.getElementById("blogContainer")) {
    loadBlogs();
}
// ============================
// Go To Edit Page
// ============================

function goToEdit(id) {

    localStorage.setItem("editBlogId", id);

    window.location.href = "edit-blog.html";

}

// ============================
// Delete Blog
// ============================

async function deleteBlog(id,title) {

    const result = await Swal.fire({
    title: "Delete Blog?",
html: `Are you sure you want to delete <strong>"${title}"</strong>?`,    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel"
});

if (!result.isConfirmed) {
    return;
}

    const response = await fetch(`/blogs/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    // Show success message
    const deleteSuccess = document.getElementById("deleteSuccess");

    if (deleteSuccess) {

        deleteSuccess.textContent = data.message;
        deleteSuccess.style.display = "block";

        setTimeout(() => {
            deleteSuccess.style.display = "none";
        }, 2000);

    }

    const card = document.getElementById(`blog-${id}`);

if (card) {

    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";

    setTimeout(() => {
        loadBlogs();
    }, 300);

} else {

    loadBlogs();

}
}

// ============================
// Load Blog For Editing
// ============================

async function loadBlogForEdit() {

    const blogId = localStorage.getItem("editBlogId");

    if (!blogId) return;

    const response = await fetch("/blogs");
    const blogs = await response.json();

    const blog = blogs.find(b => b.id == blogId);

    if (!blog) return;

    title.value = blog.title;
    author.value = blog.author;
    content.value = blog.content;

    if (charCount) {
        charCount.textContent = `Characters: ${content.value.length} / 500`;
    }

}

if (window.location.pathname.includes("edit-blog.html")) {
    loadBlogForEdit();
}