var express = require("express")
var router = express.Router()
var Campground = require ("../models/campground")
//const { findById } = require("../models/comment")
//const campground = require("../models/campground")
var middleware = require("../middleware")
const middlewareobj = require("../middleware")

//INDEX-SHOW ALL CAMPGROUNDS
router.get("/campgrounds",function(req, res){
    Campground.find({},function(err,allCampgrounds){
      if(err){
        console.log(err)
      }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user})
      }
    })
  })
    
  
  //CREATE-ADD NEW  CEMPGROUNDS
  router.post("/campground",middleware.isLoggedIn, function(req,res){[]
    //get data from form and add to campgrounds array
    var name = req.body.name
    var rice = req.body.price
      var image = req.body.image
      var desc=req.body.description
      var author ={
        id:req.user._id,
        username:req.user.username
      }
     var newCampgrounds = {name:name,price:price,image:image,description:desc,author:author}
     console.log(req.user)

     Campground.create(newCampgrounds, function(err,newlyCreated){
        if(err){
          console.log(err)
        }else{
          console.log(newlyCreated)
          res.redirect("/campgrounds")
        }
     })
    //redirect back to campgrounds page
  
  })
  //SHOW FORM TO CREATE TO NEW CAMPGROUNDS
  router.get("/campgrounds/new",middleware.isLoggedIn,  function(req,res){
      res.render("campgrounds/new")
      res.render("/campgrounds")
  })
  
  router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
        console.log(err)
      }else{
        console.log(foundCampground)
        //render show template with that template
        res.render("campgrounds/show",{campground:foundCampground})
      }
    })
    
  })
//EDIT CAMPGROUNDROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
  // is user logged in 
    Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit",{campground:foundCampground}) 
      })
  })
  
//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds/" +req.params.id)
      
    }
  })
  //redirect

})
//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds")
    }
  })
})


  //function to stop writing comment (when thw user is not signed in)-MIDDLEWARE
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

  module.exports = router