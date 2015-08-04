/**
 * Created by naveed on 8/2/2015.
 */

var mongoose=require('mongoose'),
    Schema=mongoose.Schema,
    bcrypt=require('bcrypt-nodejs');



var UserSchema=new Schema({
        name:String,
        username: {type:String, required:true, index: {unique:true}},
        password: {type:String, required:true, select:false}
});

UserSchema.pre('save',function(next){
    var user=this;

    //hash the password, if new or password change

    if(!user.isModified('password'))
    {
        return next()
    }

    bcrypt.hash(user.password,null,null,function(err,hash){

        if(err)
           next(err)

        user.password=hash;
        next();

    })

});

UserSchema.methods.comparePassword=function(password){

    var user=this;

    return bcrypt.compareSync(password,user.password);
};

module.exports=mongoose.model('User',UserSchema);