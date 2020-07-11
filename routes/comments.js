var express = require("express")
var router = express.Router()
//var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//COMMENTS CREATE
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
    //find camp by id
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        console.log(err)
      }else{
        res.render("comments/new",{campground:campground})
      }
    })
   
  })
  
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
      if(err){
        req.flash("error", "Something went wrong")
        console.log(err)
        res.redirect("/campgrounds")
      }else{
        Comment.create(req.body.comment,function(err, comment){
          if(err){
            console.log(err)
          
          }else{
              //add username and id to comment
              comment.author.id = req.user._id//to display username automatically
              comment.author.username = req.user.username
              console.log("New comment username will be:"+ req.user.username)
              //save comment
              comment.save()
            campground.comments.push(comment)
            campground.save()
            console.log(comment)
          req.flash("success", "Successfully added comment")
            res.redirect("/campgrounds/" + campground._id)
          }
        })
      }
    })
    //create new comment
    //connect new to campground
    //redirect to campground showpage
  })
  //COMMENTS EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("/campgrounds/:id")
    }else{
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment })
    }
  })
})
//COMMENT UPDATE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err) {
      res.redirect("back")
    }else{
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})
//COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
  //findbyid and remove
Comment.findByIdAndRemove(req.params.comment_id, function(err){
  if(err){
    res.redirect("back")
  }else{
    req.flash("success", "Comment deleted")
    res.redirect("/campgrounds/"+ req.params.id)
  }
})
})

  //middleware
  //==========
//function to stop writing comment (when thw user is not signed in)-MIDDLEWARE

  module.exports = router