var express = require('express');
var router = express.Router();

const session = require('cookie-session')


var mysql = require('mysql');
var connection = mysql.createConnection({
      host:"localhost",
      port:"3306",
      user:"root",
      password:"019890",
      database:"zoey",
    });
  connection.connect();
/* GET home page. */
router.get('/login',function(req,res){
  res.render('login')
})


router.post('/login',function(req,res){
  var body = req.body
  connection.query('select * from user', function(err,result){
    if (err) {
      console.log('select fail' + err);
      return
    }
    var signup = false
    if (Array.from(result).length == 0){
      signup = true
    }
      for( i of result) {
        if (i.username === body.username){
        signup = false
        break
      }else{
          signup = true
        }
      }
      if (signup) {
        connection.query('insert into user(user_id,username,userpassword,e_mail) values(null,?,?,?)',[body.username,body.password,body.useremail],function(err,result){
          if (err){
            console.log('insert fail' +err);
            return
          }
           res.render('login')
        })
      }else {
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/index2">注册信息有误，请重新注册</a></h1>')
      }
  })
})
router.post('/index',function(req,res){
  var body = req.body
  connection.query('select * from user',function(err,result){
    if(err){
      console.log('select fail' +err);
      return
    }
    var Login = false
    for( i of result){
      if(i.username == body.username && i.userpassword == body.password && i.e_mail == body.useremail){
        Login = true
        break
      }else {
        Login = false
      }
    }
    if (Login) {
      res.render('index')
    }else{
      res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/login">登录失败，请重试</a></h1>')
    }
  })
})
  router.get('/',function(req,res,next){
       res.render('login')
  });


  
  
module.exports = router;