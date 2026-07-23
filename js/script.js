console.log("JavaScript Connected!");

// ============================
// DOM Elements
// ============================

const form = document.getElementById("blogForm");

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
// Form Validation
// ============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;

    // Clear previous success message
successMessage.textContent = "";
successMessage.style.display = "none";
    // ============================
    // Blog Title Validation
    // ============================

    if (title.value.trim() === "") {
        titleError.textContent = "Please enter blog title.";
        isValid = false;
    } else {
        titleError.textContent = "";
    }

    // ============================
    // Author Validation
    // ============================

    if (author.value.trim() === "") {
        authorError.textContent = "Please enter author name.";
        isValid = false;
    } else {
        authorError.textContent = "";
    }

    // ============================
    // Content Validation
    // ============================

    if (content.value.trim() === "") {
        contentError.textContent = "Content cannot be empty.";
        isValid = false;
    } else {
        contentError.textContent = "";
    }

    // ============================
    // Image Validation
    // ============================

    if (image.files.length === 0) {
        imageError.textContent = "Please upload a cover image.";
        isValid = false;
    } else {
        imageError.textContent = "";
    }

    // Stop submission if any validation fails
    if (!isValid) {
        return;
    }

    // ============================
    // Success
    // ============================

successMessage.textContent = "✅ Blog validated successfully!";
successMessage.style.display = "block";

    console.log("Title:", title.value);
    console.log("Author:", author.value);
    console.log("Content:", content.value);
    console.log("Image:", image.files);

});

// ============================
// Character Counter
// ============================

content.addEventListener("input", function () {

    if (content.value.length > 500) {
        content.value = content.value.slice(0, 500);
    }

    charCount.textContent = `Characters: ${content.value.length} / 500`;

});