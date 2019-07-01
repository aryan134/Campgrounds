var express = require("express");
var router = express.Router();
var Todo = require("../models/todo");
var middleware = require("../middleware");

router.get("/todos", function(req, res) {
    // res.render("index.ejs");
    Todo.find({}, function(err, todoList) {
        if(err){ console.log(err);}
        else {
            res.render("todo/index", {todoList: todoList,currentUser: req.user});
        }
    });    
});
router.get("/todos/:id",function(req,res){
     Todo.find({}, function(err, todoList) {
        if(err){ console.log(err);}
        else {
            res.render("todo/show", {todoList: todoList,currentUser: req.user});
        }
    });    
})

//add new todo item to list
router.post("/todos", function(req, res) {
         var name = req.body.name;
    var author={
                   id: req.user._id,
                   username: req.user.username
                }  ;
    var newTodo = {name: name,author: author};
    // Create a new campground and save to DB
    Todo.create(newTodo, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/todos");
        }
    });
});
//DESTROY TODO ROUTES
router.delete("/todos/:id", function(req,res){
    Todo.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/todos");
        }  else {
            res.redirect("/todos");
           }
    });
});
module.exports = router;