/**
 * Created by naveed on 8/11/2015.
 */
var User=require('../models/user'),
    jwt=require('jsonwebtoken'),
    config=require('../../config'),
    superSecret=config.secret;

module.exports=function(app,express){
var apiRouter=express.Router();
    apiRouter.route('/authenticate').post(function(req,res){

        User.findOne({

            username: req.body.username}).select('name username password').exec(function(err,user){

            if(err) throw err

            if(!user){

                res.json({
                    success:false,
                    message: 'Authentication failed, User not found'
                })
            }else if(user)
            {
                var validPassword=user.comparePassword(req.body.password);

                if(!validPassword){

                    res.json({
                        success: false,
                        message: 'Authentication Failed, Wrong Password'
                    })
                }
                else {
                    var token = jwt.sign({
                            name: user.name,
                            username: user.username
                        },
                        superSecret,
                        {
                            expiresInMinutes: 1440
                        }
                    );

                    res.json({
                        success: true,
                        message: 'Enjoy your token',
                        token: token
                    })
                }

            }


        })

    });

    apiRouter.use(function(req,res,next){
        var token=req.token || req.param('token') || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,superSecret,function(err,decoded){
                if(err){
                    res.status(403).send({
                        success:false,
                        message: 'Token authentication failed'

                    })

                }
                else{
                    req.decoded=decoded;
                    next();


                }


            })

        }else
        {
            res.status(403).send({
                success:false,
                message: 'No token provided'

            })

        }


    });

    apiRouter.get('/',function(req,res){
        res.json({message:"hooray! welcome to our api"});
    });

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


    apiRouter.get('/me',function(req,res){
        res.send(req.decoded);


    })

return apiRouter;

}