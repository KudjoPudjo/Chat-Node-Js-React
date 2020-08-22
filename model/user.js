const mongoose = require("mongoose");
const schema = mongoose.Schema;


const user = new schema({
    login:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    id:{
        type:Number,
        required:true
    }
})


const User = module.exports = mongoose.model("chat-Users",user);

module.exports.saveUser = function(obj,callback){
        User.find({},(err,result)=>{
        let loginIsDefind = true
        let id        
        if(err)throw err;
        result.map(elem=>{
            if(elem.login === obj.login){
                loginIsDefind = false
            }
        })             
        id = result.length        
        if(loginIsDefind){
            let new_user = obj;
            new_user.id = id            
            let saveUser = new User(new_user);
            saveUser.save(callback)
        }else{
            callback(null,false)
        }
    })
    
}
module.exports.getUser = function(obj,callback){
    User.find({login:obj.login,password:obj.password},(err,result)=>{
        if(err)return callback(err);        
        return callback(null,result)
    })
    
}

//find user for Deserilisation and newChat
module.exports.get = function(login,callback){    
    User.find({login:login.toString()},(err,result)=>{
        if(err)return callback(err);        
        return callback(null,result)
    })
    
}
