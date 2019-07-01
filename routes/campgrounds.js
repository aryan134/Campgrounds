var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/campgrounds",function(req,res){
     
     Campground.find({},function(err,campground){
         if(err){
             console.log(err);
         }
         else{
             res.render("campgrounds/index",{campground: campground, currentUser: req.user});
         }
     });
 });
 
 //CREATE - add new campground to DB
router.post("/campgrounds", middleware.isLoggedIn , function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author={
                   id: req.user._id,
                   username: req.user.username
                }  ;
    var newCampground = {name: name, image: image, description: desc,author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
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

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }  else {
            res.redirect("/campgrounds");
           }
    });
});


 

module.exports = router;