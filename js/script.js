console.log("JavaScript Connected!");

// ============================
// DOM Elements
// ============================

const form = document.getElementById("blogForm");
const editForm = document.getElementById("editBlogForm");

console.log("editForm =", editForm);

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

//to cahnge id which blog we are updating
let editingBlogId = null;
// ============================
// Form Validation
// ============================
if(form)
{
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

    // ============================
    // Blog Title Validation
    // ============================

    if (title.value.trim() === "") {
        titleError.textContent = "Please enter blog title.";
        isValid = false;
    }

    // ============================
    // Author Validation
    // ============================

    if (author.value.trim() === "") {
        authorError.textContent = "Please enter author name.";
        isValid = false;
    }

    // ============================
    // Content Validation
    // ============================

    if (content.value.trim() === "") {
        contentError.textContent = "Content cannot be empty.";
        isValid = false;
    }

    // ============================
    // Image Validation
    // ============================

    if (image.files.length === 0) {
        imageError.textContent = "Please upload a cover image.";
        isValid = false;
    }

    // Stop if validation fails

    if (!isValid) {
        return;
    }


//Handle the Edit Form Submission
if (editForm) {

        console.log("Edit form listener attached.");


    editForm.addEventListener("submit", async function (event) {
                console.log("Submit event fired!");

        event.preventDefault();
        console.log("Update button clicked!");

        const blogId = localStorage.getItem("editBlogId");

        const response = await fetch(`/blogs/${blogId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                content: document.getElementById("content").value
            })
        });

        const data = await response.json();

        alert(data.message);

    });

}

    // ============================
    // Send Data to Express Server
    // ============================

    const response = await fetch("/blogs", {
        method: "POST",
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

    // ============================
    // Show Success Message
    // ============================

    successMessage.textContent = data.message;
    successMessage.style.display = "block";

    console.log("Server Response:", data);

    // Optional: Clear form after successful submission
    form.reset();

    // Reset character counter
    charCount.textContent = "Characters: 0 / 500";

});
}

if(content)
{
// ============================
// Character Counter
// ============================

content.addEventListener("input", function () {

    if (content.value.length > 500) {
        content.value = content.value.slice(0, 500);
    }

    charCount.textContent = `Characters: ${content.value.length} / 500`;

});
}

//show blogs
async function loadBlogs() {

    const response = await fetch("/blogs");
    const blogs = await response.json();

    const container = document.getElementById("blogContainer");

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `
            <div class="blog-card">

                <div class="card-content">

                    <h3>${blog.title}</h3>

                    <p>${blog.content.substring(0, 100)}...</p>

                    <p><strong>Author:</strong> ${blog.author}</p>

                    <button onclick="goToEdit(${blog.id})">
    Edit
</button>

                </div>

            </div>
        `;

    });

}

if (document.getElementById("blogContainer")) {
    loadBlogs();
}



function goToEdit(id) {

    localStorage.setItem("editBlogId", id);

    window.location.href = "edit-blog.html";

}
async function loadBlogForEdit() {

    const blogId = localStorage.getItem("editBlogId");

    if (!blogId) return;

    const response = await fetch("/blogs");
    const blogs = await response.json();

    const blog = blogs.find(b => b.id == blogId);

    if (!blog) return;

    document.getElementById("title").value = blog.title;
    document.getElementById("author").value = blog.author;
    document.getElementById("content").value = blog.content;

}

if (window.location.pathname.includes("edit-blog.html")) {
    loadBlogForEdit();
}