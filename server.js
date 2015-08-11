var express=require('express'),
    app=express(),
    bodyParser=require('body-parser'),
    morgan=require('morgan'),
    mongoose=require('mongoose'),
    User=require('./app/models/user'),
 //   port=process.env.port || 3000,
    jwt=require('jsonwebtoken'),
  //  superSecret='ilovedarkbrownchocolate',
    path=require('path'),
    config=require('./config');


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
app.use(express.static(__dirname+'/public'))



 mongoose.connect(config.database);

// SETUP FOR ROUTES
//basic route for the home page

//test route to the apinode
var apiRouter=require('./app/routes/api')(app,express);
app.use('/api',apiRouter);
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
app.listen(config.port);

console.log("Server Listening on port {0}",config.port);