var express = require('express');
var router = express.Router();


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
 
router.post('/index',function(req,res){
  var body = req.body
  connection.query('select * from user', function(err,result){
    if (err) {
      console.log('select fail' + err);
      return
    }
    var signup = false
    if (Array.from(result).leng == 0){
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
        //中括号里的是你获取的form表单的参数
        connection.query('insert into user values(null,?,?)',[body.username,body.password],function(err,result){
          if (err){
            console.log('insert fail' +err);
            return
          }
          res.render('index')
        })
      }else {
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/login">用户已存在，请重新注册</a></h1>')
      }
  })
})
router.post('/login',function(req,res){
  var body = req.body
  connection.query('select * from user',function(err,result){
    if(err){
      console.log('select fail' +err);
      return
    }
    let Login = false
    for( i of result){
      //i后面的名字要对应数据库的列名，body后面的名字对应form表单的name
      if(i.username == body.username && i.userpassword == body.password){
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
  router.get('/', function(req, res, next) {
    res.render('index')
   });

module.exports = router;