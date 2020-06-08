var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Positive = require("../models/positiveCount");
var Negative = require("../models/negCount");
var cheerio = require("cheerio");
var request = require("request");


//====================
//AUTH ROUTES
//====================






router.post("/pos", function(req, res){
    
    var username = req.body.username;
    var positive = req.body.positive;
    console.log("this is the req.body.positive:::: " + req.body.username);
    
    var newUsername = new Positive({username: username, positive: positive}); 
    console.log("this is newPositive:::: " + newUsername.username);

    newUsername.save(function (err, newlycreated) {
        if (err) {
            console.log("this is the error::::::::::: " + err);
            
            req.flash("error", "Validation Error!!! @" + newUsername.username + " is trying to perform a duplicate!");
            res.redirect("/");
        }
        else {
            req.flash("success", "Validation Complete!! @" + newUsername.username + " is tested negative for covid by Nicov.");
            res.redirect("/");
        }
    });


})



router.post("/neg", function(req, res){

    var username = req.body.username;
    var negative = req.body.negative;
    console.log("this is the req.body.negative:::: " + req.body.negative);

    var newUsername = new Negative({username: username, negative: negative});

    newUsername.save(function (err, newlycreated) {
        if (err) {
            console.log("this is the error::::::::::: " + err);
            
            req.flash("error", "Validation Error!!! @" + newUsername.username + " is trying to perform a duplicate!");
            res.redirect("/");
        }
        else {
            req.flash("success", "Validation Complete!! @" + newUsername.username + " is tested positive for covid by Nicov.");
            res.redirect("/");
        }
    });


})


router.get("/overall", function(req,res){
    request('https://covid19.ncdc.gov.ng', (error, response, html) => {
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
    
            const table = $('table#custom1 tbody');
    
            //console.log("this is table.html():::::::::" + table);
    
    
    
    
            //==================================================
            //for the states
            //==================================================
            var states = [];
    
            $('table#custom1 tbody tr td:nth-of-type(1)').each((i, el) => {
                const state = $(el).text().replace(/(\r\n|\n|\r|\t)/gm, "");
    
                //console.log("this is item gan gan" + item);
    
                states.push(state);
    
            })
            
    
    
            
            //==================================================
            //for the confirmes cases in states
            //==================================================
            var cc_states = [];
    
            $('table#custom1 tbody tr td:nth-of-type(2)').each((i, el) => {
                const cc_state = $(el).text().replace(/(\r\n|\n|\r|\t)/gm, "");
    
                //console.log("this is item gan gan" + item);
    
                cc_states.push(cc_state);
    
            })
    
    
            
            //==================================================
            //for the number of recovered cases
            //==================================================
            
            var rc_states = [];
    
            $('table#custom1 tbody tr td:nth-of-type(4)').each((i, el) => {
                const rc_state = $(el).text().replace(/(\r\n|\n|\r|\t)/gm, "");
    
                //console.log("this is item gan gan" + item);
    
                rc_states.push(rc_state);
    
            })
            
    
            
            //==================================================
            //for the number of death cases
            //==================================================
    
    
            var dc_states = [];
    
            $('table#custom1 tbody tr td:nth-of-type(5)').each((i, el) => {
                const dc_state = $(el).text().replace(/(\r\n|\n|\r|\t)/gm, "");
    
                //console.log("this is item gan gan" + item);
    
                dc_states.push(dc_state);
    
            })
    
    
            res.render("overall_stats.ejs", {
                states: states,
                cc_states: cc_states,
                rc_states: rc_states,
                dc_states: dc_states
            });
        }
        else {
            console.log("this is an error!!! ::::::::::::::::::::" + error)
        }
    })   
    
})


router.get("/secret", middleware.isLoggedIn, function(req, res){
    res.render("secret");
})



router.get("/secret2", middleware.isLoggedIn, function(req, res){
    res.render("secret2", {
        currentUser: req.user
    });
})


//show register form
router.get("/register", function(req,res){
    res.render("register");
})


//handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
            if(err){

                    req.flash("error", err.message);
                    return res.render("register", {currentUser: req.user});
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("success",user.username +  "! Welcome to covid-19 posts");
                    res.redirect("/posts");
            })
    })
})


//show login form
router.get("/login", function(req,res){
    res.render("login");
});


//handling login logic
router.post("/login",passport.authenticate("local", 
    {
            successRedirect: "/posts",
            failureRedirect: "/login"
    }), function(req,res){

});


//logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/posts");
})

router.get("/about", function(req, res){
    res.render("about");
})

router.get("/animations", function(req, res){
    res.render("animation");
})

router.get("/ctest", function(req, res){
    res.render("ctest");
})

router.get("/ctest/spread", function(req, res){
    res.render("spread");
})
// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//             return next();
//     }
//     res.redirect("/login")
// }

module.exports = router;