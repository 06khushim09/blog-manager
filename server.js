const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Blog Manager Backend!");
});

// GET Blogs Route
app.get("/blogs", (req, res) => {
    const blogs = [
        {
            id: 1,
            title: "My First Blog"
        },
        {
            id: 2,
            title: "Learning Express"
        }
    ];

    res.json(blogs);
});

// POST Blog Route
app.post("/blogs", (req, res) => {

    const newBlog = req.body;

    console.log(newBlog);

    res.json({
        message: "Blog received successfully!",
        blog: newBlog
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});