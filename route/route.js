const Route = require("express").Router();
const controller =require("../controllers/controller")

function Auth(req,res,next){        
    if(req.isAuthenticated()){
        next()
    }
    else return res.json({result:"Пожалуйста авторизируйтесь"})
}

Route.get("/getAllMassage",Auth,controller.getAllMassages)
Route.post("/register",controller.register)
Route.post("/login",controller.login)
Route.post("/newChat",controller.newChat)
Route.post("/newMassage",controller.newMassage)
Route.get("*",controller.React)

module.exports = Route