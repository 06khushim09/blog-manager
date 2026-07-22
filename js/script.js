console.log("JavaScript Connected!");

/* Read the input values*/
const form = document.getElementById("blogForm");

const title = document.getElementById("title");/*Notice these variables store the HTML elements, not the text inside them.*/
const author = document.getElementById("author");
const content = document.getElementById("content");
const image = document.getElementById("image");
const charCount = document.getElementById("charCount");


form.addEventListener("submit", function (event) {
    /*stop page from refreshing*/
    event.preventDefault();

    /*blog title can not be null*/
    if(title.value.trim() === "")/*trim removes extra space */
    {
        alert("Bolg title can not be empty");
        return;
    }


    if(author.value.trim()==="")
    {
        alert("Please enter author name");
        return;
    }
    if(content.value.trim()==="")
    {
        alert("Content can not be empty");
        return;
    }
    if(image.files.lenth==0)
    {
        alert("Upload at least one Image");
    }
    

    console.log(title.value);
    console.log(author.value);
    console.log(content.value);
    console.log(image.files);

});

content.addEventListener("input", function () {
    charCount.textContent = "Characters: " + content.value.length;
});
