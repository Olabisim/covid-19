
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var Like = require("../models/like");

//====================================
//COMMENTS ROUTE
//====================================

//comments newmum
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err,campground){
            if(err){
                    console.log(err);
            }
            else {
                    res.render("comments/new", {campground: campground, currentUser: req.user});
            }
    })
})




//for the increment of likes
router.post("/likes", middleware.isLoggedIn, function(req, res){
        Campground.findById(req.params.id, function(err, campground){
                if(err){
                        console.log(err);
                        res.redirect("/posts");
                }
                else {
                        console.log("this is the campgrounds id::" + req.params.id);
                        Like.create(req.body.like, function(err, like){
                                if(err){
                                        req.flash("error", "Something went wrong");
                                        console.log(err);
                                }
                                else {
                                        console.log("this is the like" + like);
                                        like.save();
                                        campground.likes.push(like);
                                        campground.save();
                                        req.flash("success", "Successfully liked a post");
                                        res.redirect("/posts");
                                }
                        })
                }
        })
})
//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
            if(err){
                    console.log(err);
                    res.redirect("/posts");
            }
            else {
                    Comment.create(req.body.comment, function(err, comment){
                            if(err){
                                    req.flash("error", "Something went wrong");
                                    console.log(err);
                            }
                            else {
                                    //ADD USERNAME AND ID TO COMMENT
                                    comment.author.id = req.user._id;
                                    comment.author.username = req.user.username;
                                    //SAVE COMMENT
                                    comment.save();
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log(comment);
                                    req.flash("success", "Successfully added comment");
                                    res.redirect("/posts/" + campground._id);
                            }
                    })
            }
    })
});






//COMMENT EDIT

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
        Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err){
                        res.redirect("back");
                }else {
                        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
                }
        })
})

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment){
                if(err){
                        res.redirect("back");
                }else {
                        res.redirect("/posts/" + req.params.id);
                }
        })
})


//COMMENT DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
        //findBy
        Comment.findByIdAndRemove(req.params.comment_id, function(err){
                if(err){
                        res.redirect("back");
                }else {
                        req.flash("Success", "Comment deleted")
                        res.redirect("/posts/" + req.params.id);
                }
        })
})





// function checkCommentOwnership(req, res, next){
//         //IS USER LOGGED IN?
//         if(req.isAuthenticated()){

//                 Comment.findById(req.params.comment_id, function(err, foundComment){
//                         if(err){
//                                 res.redirect("back");
//                         }
//                         else {
//                                 //DOES USER OWN THE comment
//                                 if(foundComment.author.id.equals(req.user._id)){
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

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//             return next();
//     }
//     res.redirect("/login")
// }


module.exports = router;