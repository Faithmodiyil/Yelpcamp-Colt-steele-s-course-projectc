var Campground = require("../models/campground")
var comment = require("../models/comment")
//all the middleware goes here
var middlewareobj = {}
  middlewareobj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
              req.flash("error", "Campgrouond not found")
              res.redirect("back")
            }else{
                  // does user own the campground
                 
              if(foundCampground.author.id.equals(req.user._id)){
                  next()
               
              }else{
              req.flash("error", "You don't have the permission to do that")
                res.redirect("back")
              }    
            }
          })
        }else{
          req.flash("error", "You need to be logged in to do that")
          res.redirect("back")
        }
      }
  
  middlewareobj.checkCommentOwnership = function(req, res , next){
      //check campground ownership
    if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
          res.redirect("back")
        }else{
              // does user own the campground
             
          if(foundCampground.author.id.equals(req.user._id)){
              next()
           
          }else{
            req.flash("error", "You don't have permission to do that")
            res.redirect("back")
          }    
        }
      })
    }else{
      req.flash("error", "You need to logged in to do that")
      res.redirect("back")
    }
  }
  middlewareobj.isLoggedIn = function(req, res, next){
        //function to stop writing comment (when thw user is not signed in)-MIDDLEWARE
    if(req.isAuthenticated()){
      return next()
    }
    req.flash("error","You need to be logged in to do that")
    res.redirect("/login")

  }
  

module.exports = middlewareobj