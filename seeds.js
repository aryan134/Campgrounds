var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//FUNCTION TO DELETE OR REMOVE ALL CAMPGROUNDS
var data= [
    {
        name: "Space light camp!!",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
        description:"Awesome place to come and see northern lights which you have never seen before."
    },
    {
        name: "Tall tree",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfe9dd8ec2366865f02eabd3a8c91d3f&auto=format&fit=crop&w=500&q=60",
        description:"Awesome place to see wonderfull tress!!"
    },
    {
      name:"Mountain camps",
      image: "https://images.unsplash.com/photo-1513673953682-c64113e2866a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ac493edfc02a322820703625d747055&auto=format&fit=crop&w=500&q=60",
      description:"Tall mountains range view!!"
    }
    ];




 
 function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //              Comment.create(
        //                 {
        //                     author: "Homer",
        //                     text: "This place is great, but I wish there was internet"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
}

module.exports = seedDB;