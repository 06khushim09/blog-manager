const express = require("express");

const app = express();

app.use(express.json());

// Serve HTML, CSS, JS and images
app.use(express.static(__dirname));

const PORT = 3000;

// Temporary storage (will reset when server restarts)
let blogs = [];
let nextId = 1;

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Blog Manager Backend!");
});

// GET All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST - Add New Blog
app.post("/blogs", (req, res) => {

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

// PUT - Update Blog
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

// DELETE - Remove Blog
app.delete("/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = blogs.findIndex(blog => blog.id === id);

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

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});