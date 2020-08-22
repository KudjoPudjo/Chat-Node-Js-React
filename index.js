const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT?process.env.PORT:9000


mongoose.connect("mongodb://localhost:27017/website",{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("connected",()=>{
    console.log("Мы успешно подключились к БД");
    app.listen(port,()=>{
        console.log("Сервер запущен");        
    })
})

