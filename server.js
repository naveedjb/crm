var express=require('express'),
    app=express(),
    bodyParser=require('body-parser'),
    morgan=require('morgan'),
    mongoose=require('mongoose'),
    User=require('./app/models/user'),
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


 mongoose.connect('mongodb://naveed:11111@ds029793.mongolab.com:29793/crm');

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
}).get(function(req,res){
    User.find(function(err,users){

        if(err)
            res.send(err);

        res.json(users);
    })


})

apiRouter.route('/users/:user_id').get(function(req,res){


    User.findById(req.params.user_id,function(err,user){
        if(err)
            res.send(err)

        res.json(user);
    })

})
.put(function(req,res){

        User.findById(req.params.user_id,function(err,user){
            if(err)
                res.send(err);
            if(req.body.name) user.name=req.body.name;
            if(req.body.username) user.username=req.body.username;
            if(req.body.password) user.password=req.body.password;

            user.save(function(err){
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'User updated!' });

            });
        })

    })
.delete(function(req,res){

        User.remove({_id:req.params.user_id},function(err,user){

            if(err) res.send(err);

            res.json({message: 'Successfully deleted'});

        })


    })

app.use('/api',apiRouter);

app.listen(port);

console.log("Server Listening on port {0}",port);