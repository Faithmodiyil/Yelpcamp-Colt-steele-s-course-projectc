var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")

router.get("/",function(req,res){
    res.render("landing")
  })
//AUTH ROUTES
//===========
router.get("/register", function(req, res){
    res.render("register")
  })
  
  //handle signup logic
 router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        
        req.flash("error",err.message)
        return res.redirect("register")
      // return res.render("register", {"error": err.message});
      }
      passport.authenticate("local")(req, res, function(){
        req.flash("success","Welcome to Yelpcamp " + user.username)//user name coming from the database
        res.redirect("/campgrounds")
      })
    })
  
  })
  //show login form
  router.get("/login", function(req, res){
    res.render("login")
  })
  //hadling login logic 
  //middlewre
  router.post("/login", passport.authenticate("local",
    {
      successRedirect:"/campgrounds",
      failureRedirect:"/login"
    }),
    
     function(req,res){
    
    })
    //logout route
    router.get("/logout", function(req, res){
      req.logout()
      req.flash("success", "logged you out")
      res.redirect("/campgrounds")
    })

  module.exports = router