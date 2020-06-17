var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    request = require('request'),
    First = require("./models/positiveCount"),
    Second = require("./models/negCount"),
    Like = require("./models/like"),
    middleware = require("./middleware"),
    cheerio = require('cheerio');


const nodemailer = require('nodemailer');

//img
//https://images.unsplash.com/photo-1586521995568-39abaa0c2311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80



//requiring routes
var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        authRoutes = require("./routes/index");


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
//mongoose.connect("mongodb://localhost/covid", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(flash());

const PORT = process.env.PORT || 3000;      

app.set("view engine", "ejs");

// seedDB(); //seed the database

var Campground = require("./models/campground");
var Comment = require("./models/comment");


//PASSPORT CONFIGURATION
app.use(require("express-session")({
        secret: "Once again Rusty wins cutest dog!",
        resave: false,
        saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
        res.locals.currentUser = req.User;
        console.log("this is the current user stuff" + req.User)
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
})

app.use(authRoutes);
app.use("/posts", campgroundRoutes);
app.use("/posts/:id/comments",commentRoutes);


function fetchJSON(url) {
        return new Promise((resolve, reject) => {
                request(url, function(err, res, body) {
                        if (err) {
                                reject(err);    
                        } else if (res.statusCode !== 200) {
                                reject(new Error('Failed with status code ' + res.statusCode));
                        } else {
                                resolve(JSON.parse(body));
                        }
                });
        });
    }
      
    //this is the root route
app.get("/", function(req, res){
        const p1 = fetchJSON('https://covid19.mathdro.id/api');
        const p2 = fetchJSON('https://covid19.mathdro.id/api/countries/USA');
        const p3 = fetchJSON('https://covid19.mathdro.id/api/countries/nigeria');
        const p4 = fetchJSON('https://covid19.mathdro.id/api/countries/China');
        const p5 = fetchJSON('https://covid19.mathdro.id/api/countries/Italy');
        const p6 = fetchJSON('https://covid19.mathdro.id/api/countries/Spain');
    
        
        Promise.all([p1, p2, p3, p4, p5, p6]).then((data) => {

                First.find({}, function(err, count){
                        if(err){
                                console.log("this is the positive count:::::  " + err);
                        }
                        else {
                                Second.find({}, function(err, negcount){
                                        if(err){
                                                console.log("this is the positive count:::::  " + err);
                                        }
                                        else {
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

														res.render("ham.ejs", {
																negcount: negcount, 
																count: count, 
																currentUser: req.user,
																data_one: data[0],
																data_two: data[1],
																data_three: data[2],
																data_four: data[3],
																data_five: data[4],
																data_six: data[5],
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

                                                
                                        }
                                })
                        }
                })
        }).catch(err => console.error('There was a problem', err));
})


//for the increment of likes
app.post("/likes", middleware.isLoggedIn, function(req, res){
        Campground.findById(req.params.id, function(err, campground){
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




app.post('/contactfa', (req,res) => {
        "use strict";

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                        user: 'ajoseholabisi@gmail.com', // generated ethereal user
                        pass: 'Olabisiminasu090', // generated ethereal password
                },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
                from: 'ajoseholabisi@gmail.com', // sender address
                to: "ajoseolabisiii@gmail.com", // list of receivers
                subject: "COVID-19", // Subject line
                text: req.body.bodyy,
                html: '<p style="color: green;">✔ A nigerian just checked</p><h4 style="color: black;"> ' + req.body.bodyy + ' </h4><p style="color: black;">tested by </p><p> <a href="https://pacific-hollows-29220.herokuapp.com/ctest"> https://pacific-hollows-29220.herokuapp.com/ctest </a></p>'
        });

        
        console.log(req.body.user_name);
        console.log(req.body.user_mail);
        console.log(req.body.user_message);
        
        console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
        res.redirect("/");
})


app.post('/contacty', (req,res) => {
        "use strict";

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                        user: 'ajoseholabisi@gmail.com', // generated ethereal user
                        pass: 'Olabisiminasu090', // generated ethereal password
                },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
                from: 'ajoseholabisi@gmail.com', // sender address
                to: "ajoseolabisiii@gmail.com,info@ncdc.gov.ng", // list of receivers
                subject: "COVID-19", // Subject line
                text: req.body.bodyy,
                html: '<p style="color: green;">✔ A nigerian just checked</p><p>name: ' + req.body.name + ' </p><p>phone no.: ' + req.body.number + ' </p><h4 style="color: black;"> ' + req.body.bodyy + ' </h4><p style="color: black;">tested by </p><p> <a href="https://pacific-hollows-29220.herokuapp.com/ctest"> https://pacific-hollows-29220.herokuapp.com/ctest </a></p>'
        });

        
        console.log(req.body.user_name);
        console.log(req.body.user_mail);
        console.log(req.body.user_message);
        
        console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
        res.redirect("/");
})







app.get("/*", function(req, res){
        res.render("404");
    })

app.listen(PORT, function(){
        console.log("server is running at  http://localhost:" + PORT);
})
















