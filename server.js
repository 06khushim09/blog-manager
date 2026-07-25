const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;
 let blogs = [
        {
            id: 1,
            title: "My First Blog"
        },
        {
            id: 2,
            title: "Learning Express"
        }
    ];


// Serve HTML, CSS, JS and images
app.use(express.static(__dirname));




// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Blog Manager Backend!");
    
});

// GET Blogs Route
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// POST Blog Route
app.post("/blogs", (req, res) => {

    if (!req.body.title || !req.body.author || !req.body.content) {
    return res.status(400).json({
        message: "All fields are required."
    });
}

    //to give blog a id
const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date()
};  
  blogs.push(newBlog);

//console.log("Current Blogs:", blogs);
/*console.log("New Blog:");
console.log(newBlog);*/
console.log("\n========== NEW BLOG ADDED ==========");
console.log(newBlog);

console.log("\n========== ALL BLOGS ==========");
console.table(blogs);

    res.status(201).json({
    message: "Blog created successfully!",
    blog: newBlog
});

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});