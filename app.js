const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors")
const Router = require("./route/route")
const session = require("express-session");
const FileStor = require("session-file-store")(session);


app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
      optionsSuccessStatus: 200
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session(
    {
    secret:"Zalupa", 
    store:new FileStor,
        cookie:{              
        path:"/",        
        maxAge:60*60*1000*24
    },    
    resave:false,
    saveUninitialized:false
    }
))

require("./passport/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./build"))
app.use(Router)


module.exports = app