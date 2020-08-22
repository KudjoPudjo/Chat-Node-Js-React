const User = require("../model/user");
const passport = require("passport");
const path = require("path")
const Massages = require("../model/massages")


const controller={
    login(req,res,next){       
       passport.authenticate("local",(err,result)=>{
        if(err)return next(err) 
        if(!result)return res.json({result:"Данный пользователь не найден"});
        req.logIn(result, function(err) {
            if (err) {
              return next(err);
            }
            return res.json({auth:true})
          })
       })(req, res, next);  
    },
    register(req,res){
        let obj = req.body;
        User.saveUser(obj,(err,user)=>{            
            if(err)return res.json({massage:"Ошибка",result:false});
            if(!user)return res.json({massage:"Данный логин занят",result:user});
            res.json({massage:"Вы успешно зарегестрировались!",result:user})
        })
    },
    getAllMassages(req,res){ 
        Massages.getAllMassages(req.user[0].login,(err,result)=>{
            if(err)throw err; 
            let obj = result;                        
            res.json({obj,carrentUser:req.user[0].login})
        })
    },
    newChat(req,res){
        User.get(req.body.login,(err,result)=>{
            if(err)throw err;            
            if(!result[0])return res.json({result:false,massage:"Данный пользователь не найден"});            
            let obj={
                users:[req.user[0].login,req.body.login]                
            } 
            console.log(obj);           
            Massages.newChat(obj,(err,chat)=>{
                if(err)throw err;
                Massages.getAllMassages(req.user[0].login,(err,result)=>{
                    let obj = result;                        
                    res.json({obj,carrentUser:req.user[0].login})
                })
            })
        })
    },
    newMassage(req,res){
        const obj = {
            _id:req.body._id,
            msg:{
                user:req.user[0].login,
                massage:req.body.massage
            }
        } 
        Massages.newMassage(obj,(err,result)=>{
            Massages.getAllMassages(req.user[0].login,(err,result)=>{
                let obj = result;                        
                res.json({obj,carrentUser:req.user[0].login})
            })
        })
    },
    React(req,res){
        res.sendFile(path.resolve('build', 'index.html'));
    }
}

module.exports = controller