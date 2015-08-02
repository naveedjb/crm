var express=require('express'),
    app=express(),
    bodyParser=require('body-parser'),
    morgan=require('morgan'),
    mongoose=require('mongoose'),
    port=process.env.port || 3000;
// BASE SETUP
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
//configure cors request
app.use(function(req,res, next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type,Authorization");
    next();
});
app.use(morgan('dev'));
var mongoose = require('mongoose');

var db = mongoose.createConnection(
    'mongodb://naveedjb:12345@jello.modulusmongo.net:27017/uX7abemy'
);
var User=require('./app/models/user');
// SETUP FOR ROUTES
//basic route for the home page
app.get('/',function(req,res){
    res.send('Welcome to the Home Page');

});
//test route to the apinode
var apiRouter=express.Router();

apiRouter.get('/',function(req,res){
    res.json({message:"hooray! welcome to our api"});
});
//

apiRouter.route('/users').post(function(req,res){

    var user=new User();
    user.name=req.body.name;
    user.username=req.body.username;
    user.password=req.body.password;

    user.save(function(err){
             if (err) {
                 // duplicate entry
                 if (err.code == 11000)
                     return res.json({ success: false, message: 'A user with that username already exists. '});
                 else
                 return res.send(err);
                 }
             res.json({ message: 'User created!' });

    });
})
app.use('/api',apiRouter);

app.listen(port);

console.log("Server Listening on port {0}",port);