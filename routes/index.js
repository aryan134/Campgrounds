var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
         passport.authenticate("local")(req,res,function(){
             res.redirect("/campgrounds");
         });
    });
});

//SHOP ROUTES
router.get("/shop",function(req,res){
    res.render("shop");
});

// LOGIN ROUTES

router.get("/login",function(req,res){
    res.render("login", {message: req.flash("error")});
});

router.post("/login",passport.authenticate("local",
      {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        }),function(req, res) {
  });
  //LOGOUT LOGIC
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged you out!!");
    res.redirect("/campgrounds");
});
router.get("/",function(req, res) {
   res.render("landing");
});

module.exports = router;