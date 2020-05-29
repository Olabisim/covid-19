//all the middleware goes here

var Campground = require("../models/campground");
var Comment = require("../models/comment");



var middlewareObj = {

}
middlewareObj.checkCampgroundOwnership = function(req, res, next){
        //IS USER LOGGED IN?
        if(req.isAuthenticated()){

                Campground.findById(req.params.id, function(err, foundCampground){
                        if(err){
                                req.flash("error", "Campground not found")
                                res.redirect("back");
                        }
                        else {
                                //DOES USER OWN THE CAMPGROUND
                                if(foundCampground.author.id.equals(req.user._id)){
                                        next();
                                }
                                else {
                                        req.flash("error", "You don't have the permission to do that");
                                        res.redirect("back");
                                }
                        }
                })
        }else {
                req.flash("error", "You need to be logged in to do that");
                res.redirect("back");
        }

}

middlewareObj.checkCommentOwnership = function(req, res, next){
        //IS USER LOGGED IN?
        if(req.isAuthenticated()){

                Comment.findById(req.params.comment_id, function(err, foundComment){
                        if(err){
                                res.redirect("back");
                        }
                        else {
                                //DOES USER OWN THE comment
                                if(foundComment.author.id.equals(req.user._id)){
                                        next();
                                }
                                else {
                                        req.flash("error", "You don't have the permission to do that");
                                        res.redirect("back");
                                }
                        }
                })
        }else {
                req.flash("error", "You need to be logged in to do that");
                res.redirect("back");
        }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
            return next();
    }
    req.flash("error", "You need to be logged in to do that!")  //2
    res.redirect("/login")
}

middlewareObj.checkCommentNull = function(req, res, next){
        if(comment.text == null){
                return next();
        }
        req.flash("error", "comment cannot be empty");
}



module.exports = middlewareObj;