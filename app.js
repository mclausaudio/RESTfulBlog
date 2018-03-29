var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
//app config   
mongoose.connect("mongodb://localhost/restful-blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});