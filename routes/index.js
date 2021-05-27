var express = require('express');
var router = express.Router();

<<<<<<< HEAD
const session = require('cookie-session')

=======
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d

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
<<<<<<< HEAD


router.post('/login',function(req,res){
=======
 
router.post('/index',function(req,res){
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
  var body = req.body
  connection.query('select * from user', function(err,result){
    if (err) {
      console.log('select fail' + err);
      return
    }
    var signup = false
<<<<<<< HEAD
    if (Array.from(result).length == 0){
=======
    if (Array.from(result).leng == 0){
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
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
<<<<<<< HEAD
        connection.query('insert into user(user_id,username,userpassword,e_mail) values(null,?,?,?)',[body.username,body.password,body.useremail],function(err,result){
=======
        //中括号里的是你获取的form表单的参数
        connection.query('insert into user values(null,?,?)',[body.username,body.password],function(err,result){
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
          if (err){
            console.log('insert fail' +err);
            return
          }
<<<<<<< HEAD
           res.render('login')
        })
      }else {
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/index2">注册信息有误，请重新注册</a></h1>')
      }
  })
})
router.post('/index',function(req,res){
=======
          res.render('index')
        })
      }else {
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/login">用户已存在，请重新注册</a></h1>')
      }
  })
})
router.post('/login',function(req,res){
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
  var body = req.body
  connection.query('select * from user',function(err,result){
    if(err){
      console.log('select fail' +err);
      return
    }
<<<<<<< HEAD
    var Login = false
    for( i of result){
      if(i.username == body.username && i.userpassword == body.password && i.e_mail == body.useremail){
=======
    let Login = false
    for( i of result){
      //i后面的名字要对应数据库的列名，body后面的名字对应form表单的name
      if(i.username == body.username && i.userpassword == body.password){
>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
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
<<<<<<< HEAD
  router.get('/',function(req,res,next){
       res.render('login')
  });


  
  
=======
  router.get('/', function(req, res, next) {
    res.render('index')
   });

>>>>>>> 3bf3e62b3224605a7e6cd720972e54f5237ba73d
module.exports = router;