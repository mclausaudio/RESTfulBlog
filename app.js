var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
//app config   
mongoose.connect("mongodb://localhost/restful-blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


// Blog.create({
//     title:"test2",
//     image:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     body:"This is a test"
// });

//restful routes

app.get("/", function(req, res){
    res.redirect("/blogs");
})
// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, returnedBlogs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: returnedBlogs});    
        }
    })
});
// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});
// CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err){
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
    //redirect
})
//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
});

//UPDATE ROUTE / W PUT COMMAND
app.put("/blogs/:id", function(req, res){
    //takes 3 arguments - the blogs id you are updating, the data being sent via push, and callback
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});