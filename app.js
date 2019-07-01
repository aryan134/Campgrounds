var express          = require("express"),
        app          = express(),
  bodyParser         = require("body-parser"),
   mongoose          = require("mongoose"),
   Campground        = require("./models/campground"),
   methodOverride    = require("method-override"),
   //seedDB            = require("./seeds"),
   flash             = require("connect-flash"),
   Comment           = require("./models/comment"),
   LocalStrategy     = require("passport-local"),
   passport          = require("passport"),
   User              = require("./models/user"),
   Blog              = require("./models/blog"),
   Todo              = require("./models/todo");
  // seedDB();

//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    blogRoutes       = require("./routes/blog"),
    todoRoutes       = require("./routes/todo");

mongoose.connect("mongodb://localhost/yelp_camp9");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public")); 
app.use(methodOverride("_method"));
app.use(flash());
 //===================
 // PASSPORT CONFIG
 //===================
app.use(require("express-session")({
    secret: "Raj is confused",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



 
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);
app.use(blogRoutes);
app.use(todoRoutes);



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started");
});