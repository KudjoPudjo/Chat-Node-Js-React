const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("../model/user");
const { use } = require("passport");


passport.serializeUser(function(user, done) { 
    console.log("Серелизация",user);
    done(null, user.login);
  });
  
passport.deserializeUser(function(login, done) {  
    console.log("Десерелизация",login);      
    user.get(login,(err,res)=>{
        if(err)throw err;        
        done(null,res)
    });

});

passport.use(new LocalStrategy({usernameField: 'login',passwordField: 'password'},
    function(login, password, done) {
      let obj = {
        login,password
      }      
      user.getUser(obj,(err,result)=>{        
          if(err)return done(err);
          if(!result[0])return done(null,false); 
          return done(null,result[0])
      })
    }
  ));

  module.exports = passport