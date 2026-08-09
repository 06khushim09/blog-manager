const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());

// Serve HTML, CSS, JS and images
app.use(express.static(__dirname));

// =========================================
// IMAGE UPLOAD SETUP
// =========================================

const uploadFolder = path.join(__dirname, "uploads");

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Make uploaded images accessible
app.use("/uploads", express.static(uploadFolder));


// =========================================
// SERVER
// =========================================

const PORT = 3000;

// Temporary storage
// Data will reset when server restarts
let blogs = [];

let nextId = 1;


// =========================================
// HOME ROUTE
// =========================================

app.get("/", (req, res) => {
    res.send("Welcome to Blog Manager Backend!");
});


// =========================================
// GET ALL BLOGS
// =========================================

app.get("/blogs", (req, res) => {
    res.json(blogs);
});


// =========================================
// POST - ADD NEW BLOG
// =========================================

app.post("/blogs", upload.single("image"), (req, res) => {

    if (!req.body.title || !req.body.author || !req.body.content) {

        return res.status(400).json({
            message: "All fields are required."
        });

    }

    const newBlog = {

        id: nextId++,

        title: req.body.title,

        author: req.body.author,

        content: req.body.content,

        image: req.file
            ? "/uploads/" + req.file.filename
            : null,

        createdAt: new Date()
    };


    blogs.push(newBlog);


    console.log("\n========== NEW BLOG ADDED ==========");
    console.log(newBlog);


    console.log("\n========== ALL BLOGS ==========");
    console.table(blogs);


    res.status(201).json({

        message: "Blog created successfully!",

        blog: newBlog

    });

});


// =========================================
// PUT - UPDATE BLOG
// =========================================

app.put("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);


    if (!blog) {

        return res.status(404).json({
            message: "Blog not found."
        });

    }


    blog.title = req.body.title;

    blog.author = req.body.author;

    blog.content = req.body.content;


    console.log("\n========== BLOG UPDATED ==========");

    console.log(blog);


    console.log("\n========== ALL BLOGS ==========");

    console.table(blogs);


    res.json({

        message: "Blog updated successfully!",

        blog: blog

    });

});


// =========================================
// DELETE - REMOVE BLOG
// =========================================

app.delete("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);


    const index = blogs.findIndex(
        blog => blog.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Blog not found."
        });

    }


    const deletedBlog = blogs.splice(index, 1);


    console.log("\n========== BLOG DELETED ==========");

    console.log(deletedBlog[0]);


    console.log("\n========== ALL BLOGS ==========");

    console.table(blogs);


    res.json({

        message: "Blog deleted successfully!"

    });

});


// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(
        `Server is running on http://localhost:${PORT}`
    );

});