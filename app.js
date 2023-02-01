const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/diary');


const postSchema = mongoose.Schema ({
    title: String,
    body: String
})

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render("home", {
            homeStartingContent: homeStartingContent,
            posts: posts,
            _: _
        });
    })
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

    Post.find({}, (err, posts) => {

        posts.forEach((post) => {

            const currentName = _.lowerCase(post.title);

            if (currentName == requestedName) {
                res.render("post", {
                    title: post.title,
                    body: post.body
                });
            } 
        })
    })
})


app.post("/compose", (req, res) => {
    
    const newPost = new Post ({
        title: req.body.title,
        body: req.body.post
    })

    newPost.save((err) => {
        if(!err){
            res.redirect("/");
        }
    });
})


app.post("/delete", (req, res) => {

    const postID = req.body.postID;

    Post.deleteOne( {_id: postID} , (err, foundList) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
