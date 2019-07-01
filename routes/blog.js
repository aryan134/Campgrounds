var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");


router.get("/blogposts",function(req,res){
     
     Blog.find({},function(err,blog){
         if(err){
             console.log(err);
         }
         else{
             res.render("blogs/index",{blog: blog, currentUser: req.user});
         }
     });
 });
 
 //CREATE - add new campground to DB
router.post("/blogs", middleware.isLoggedIn , function(req, res){
    // get data from form and add to campgrounds array
    var title = req.body.title;
/*    var image = req.body.image;
*/    var desc = req.body.content;
    var author={
                   id: req.user._id,
             username: req.user.username
                }  ;
    var newBlog = {title: title, content: desc,author: author};
    // Create a new blog and save to DB
    Blog.create(newBlog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/blogposts");
        }
    });
});


router.get("/blogs/new",middleware.isLoggedIn, function(req, res) {
   res.render("blogs/new"); 
});

router.get("/campgrounds/:id", function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log(err);
          }
          else{
              res.render("campgrounds/show",{campground: foundCampground});
          }
   });
});

//EDIT AND UPDATE ROUTES

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
     Campground.findById(req.params.id,function(err,foundcampground){
            res.render("campgrounds/edit", {campground: foundcampground});
        });
    });
            

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTES

router.delete("/blogs/:id",middleware.checkBlogOwnership, function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogposts");
        }  else {
            res.redirect("/blogposts");
           }
    });
});



 

module.exports = router;