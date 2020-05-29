
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var Like = require("../models/like");

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){
        //Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
                if (err){
                        console.log(err);
                }
                else {
                        Like.find({}, function(err, countLikes){
                                if(err){
                                        console.log(err);
                                }
                                else {
                                    res.render("campgrounds/index", {
                                            campgrounds:allCampgrounds, 
                                            currentUser: req.user, 
                                            countLikes: countLikes
                                        });
                               }
                        })
                }
        })
    })


//for the increment of likes
router.post("/likes", middleware.isLoggedIn, function(req, res){



        Campground.findById("5ec9b2b38e7509243cb7c675", function(err, campground){
                if(err){
                        console.log(err);
                        res.redirect("/posts");
                }
                else {
                        console.log("this is the campgrounds id::" + req.params.id);
                        var like = req.body.like;
                    
                        var newLike = {like: like};
                    
                        Like.create(newLike, function(err, like){
                                if(err){
                                        req.flash("error", "Something went wrong");
                                        console.log(err);
                                }
                                else {
                                        //SAVE LIKE
                                        like.save();
                                        campground.save();
                                        console.log("this is the like" + like);
                                        req.flash("success", "success! @" + like + " likes a post");
                                        res.redirect("/posts");
                                }
                        })
                }
        })
})

//for the increment of likes
// router.post("/likes", middleware.isLoggedIn, function(req, res){
    
//         var like = req.body.like;
        
//         console.log("this is the req.body.like:::: " + req.body.like);
        
//         var newLike = new Like({ like:like }); 
//         console.log("this is newLike:::: " + newLike.like );

//         newLike.save(function (err, newlycreated) {
//                 if (err) {
//                 console.log("this is the error::::::::::: " + err);
                
//                 req.flash("error", "Error!!! @" + newLike.like + " is trying to perform a duplicate!");
//                 res.redirect("/");
//                 }

//                 else {
//                 req.flash("success", "Request completed!! @" + newLike.like + "likes a post.");
//                 res.redirect("/");
//                 }
//         });

// })




//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
            id: req.user._id,
            username: req.user.username
    }
    var newCampground = {name: name, image:image, description:desc, author: author};

    Campground.create(newCampground, function(err, newlycreated){
            if (err){

                    console.log(err);
            }
            else {
                    console.log(newlycreated);
                    res.redirect("/posts"); 
            }
    })
})

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new", {currentUser: req.user});
});


// SHOW - shows more info about one campground

router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err){
                    console.log(err);
            }
            else {
                    console.log(foundCampground);
                    res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user})
            }
    })
});



//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){

                res.render("campgrounds/edit", {campground: foundCampground});
                        
        })
})
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
         
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
                if(err){
                        res.redirect("/posts");
                }
                else {
                        res.redirect("/posts/" + req.params.id);
                }
        } );
})




//DESTROY CAMPGRPUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findByIdAndRemove(req.params.id, function(err){
                if(err){
                        res.redirect("/posts");
                }else {
                        res.redirect("/posts"); 
                }
        })
})
//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
            return next();
    }
    res.redirect("/login")
}

// function checkCampgroundOwnership(req, res, next){
//         //IS USER LOGGED IN?
//         if(req.isAuthenticated()){

//                 Campground.findById(req.params.id, function(err, foundCampground){
//                         if(err){
//                                 res.redirect("back");
//                         }
//                         else {
//                                 //DOES USER OWN THE CAMPGROUND
//                                 if(foundCampground.author.id.equals(req.user._id)){
//                                         next();
//                                 }
//                                 else {
//                                         res.redirect("back");
//                                 }
//                         }
//                 })
//         }else {
//                 res.redirect("back");
//         }
// }


module.exports = router;