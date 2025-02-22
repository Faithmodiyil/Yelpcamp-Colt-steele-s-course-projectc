var express = require ("express")
    passport = require("passport")
    app = express()
    bodyParser = require ("body-parser")
    mongoose = require("mongoose")
    flash = require("connect-flash")
    passport = require("passport")
    LocalStrategy = require("passport-local")
    methodOverride = require("method-override")
    Campground=require("./models/campground")
    Comment = require("./models/comment")
    User = require("./models/user")
   // seedDB = require("./seeds")

    var commentRoutes = require("./routes/comments")
    var campgroundRoutes = require("./routes/campgrounds")
    var authRoutes = require("./routes/index")
    

mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.urlencoded({extended:true}))
app.set ("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())
//seed the database
//seedDB()

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Your grace is sufficient for me",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
 
app.use(function(req, res, next){
  res.locals.currentUser = req.user
  res.locals.error= req.flash("error")
  res.locals.success = req.flash("success")
  next()
})

var CampgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  description:String
})





//app.get("/",function(req,res){
  //res.render("landing")
//})
//INDEX-SHOW ALL CAMPGROUNDS
//app.get("/campgrounds",function(req, res){
  //Campground.find({},function(err,allCampgrounds){
    //if(err){
      //console.log(err)
    //}else{
      //res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user})
    //}
  //})
//})
  

//CREATE-ADD NEW  CEMPGROUNDS
//app.post("/campground",function(req,res){[]
  //get data from form and add to campgrounds array
  //var name = req.body.name
    //var image = req.body.image
    //var desc=req.body.description
   //var newCampgrounds = {name:name,image:image,description:desc}
   //Campground.create(newCampgrounds, function(err,newlyCreated){
      //if(err){
        //console.log(err)
      //}else{
      //  res.redirect("/campgrounds")
    //  }
  // })
  //redirect back to campgrounds page

//})
///SHOW FORM TO CREATE TO NEW CAMPGROUNDS
//app.get("/campgrounds/new",function(req,res){
    //res.render("campgrounds/new")
//})

//app.get("/campgrounds/:id", function(req, res){
  //Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    //if(err){
      //console.log(err)
    //}else{
      //console.log(foundCampground)
      //res.render("campgrounds/show",{campground:foundCampground})
       
    //}
  //})
  
//})
//=========================
//COMMENTS ROUTES

//app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
  ///find camp by id
  //Campground.findById(req.params.id, function(err, campground){
    //if(err){
      //console.log(err)
    //}else{
      //res.render("comments/new",{campground:campground})
    //}
  //})
 
//})

//app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
  //lookup campground using id
  //Campground.findById(req.params.id, function(err, campground){
    //if(err){
      //console.log(err)
      //res.redirect("/campgrounds")
    //}else{
      //Comment.create(req.body.comment,function(err, comment){
        //if(err){
        //  console.log(err)
        
        //}else{
          //campground.comments.push(comment)
          //campground.save()
          //res.redirect("/campgrounds/" + campground._id)
        //}
      //})
    //}
  //})
  //create new comment
  //connect new to campground
  //redirect to campground showpage
//})
//==========
//AUTH ROUTES
//===========
//app.get("/register", function(req, res){
  //res.render("register")
//})

//handle signup logic
//app.post("/register", function(req, res){
  //var newUser = new User({username: req.body.username})
  //User.register(newUser, req.body.password, function(err, user){
    //if(err){
      //console.log(err)
      //return res.render("register")
    //}
    //passport.authenticate("local")(req,res, function(){
    //  res.redirect("/campgrounds")
  //  })
//  })

//})
//show login form
//app.get("/login", function(req, res){
  //res.render("login")
//})
//hadling login logic 
//middlewre
  //app.post("/login", passport.authenticate("local",
  //{
    //successRedirect:"/campgrounds",
    //failureRedirect:"/login"
  //}),
  
   //function(req,res){

  //})
  //logic route
  //app.get("/logout", function(req, res){
    //req.logout()
    //res.redirect("/campgrounds")
  //})
//function to stop writing comment (when thw user is not signed in)-MIDDLEWARE
 //function isLoggedIn(req,res,next){
   //if(req.isAuthenticated()){
     //return next()
   //}
   //res.redirect("/login")
 //}

app.use(authRoutes)
app.use(commentRoutes)
app.use(campgroundRoutes)


app.listen(3000, function () {
    console.log("Server started on port 3000");
  })