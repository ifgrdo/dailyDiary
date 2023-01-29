const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const postArray = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", (req, res) => {
    res.render("home", {
        homeStartingContent: homeStartingContent,
        postArray: postArray,
        _: _
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        aboutContent: aboutContent
    });
})

app.get("/contact", (req, res) => {
    res.render("contact", {
        contactContent: contactContent
    });
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.get("/posts/:name", (req, res) => {

    const requestedName = _.lowerCase(req.params.name);

    postArray.forEach((post) => {
        const currentName = _.lowerCase(post.title);

        if (currentName == requestedName) {
            res.render("post", {
                title: post.title,
                body: post.body
            });
        } 
    })
})




app.post("/compose", (req, res) => {
    const post = {
        title: req.body.title,
        body: req.body.post
    }

    postArray.push(post);

    res.redirect("/");
})




app.listen(3000, function () {
    console.log("Server started on port 3000");
});
