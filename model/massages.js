const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Schema
const massage = new schema({    
    users:{
        type:Array
    },
    massages:{
        type:Array
    }   
    ,
    
})
    
    


const Massages = module.exports = mongoose.model("Chat",massage);

//Returning all massages for carrent user
module.exports.getAllMassages = function(user,callback){
    Massages.find({users:user},(err,result)=>{
        if(err)console.log(err);
               
        callback(null,result)
    })
}
//Creating new Massage
module.exports.newMassage =async function(obj,callback){     
    const chat = await Massages.findById(obj._id)  
    chat.massages.push(obj.msg)
    console.log(chat.massages);
    await chat.save(callback)   
}

//Creating New Chat
module.exports.newChat = function(obj,callback){    
    let new_Chat = obj
    new_Chat.massages = []    
    console.log(new_Chat);
    let saveChat = new Massages(new_Chat);
    saveChat.save(callback)
}
    
    
    