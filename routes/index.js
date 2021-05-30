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


    router.post('/index',function(req,res){
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

        //中括号里的是你获取的form表单的参数

          if (err){
            console.log('insert fail' +err);
            return
          }
          res.send('<script>alert("提交成功");window.location.href="/login";</script>')
        })
      }else {
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/index2">注册信息有误，请重新注册</a></h1>')
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
    var Login = false
    for( i of result){
      if(i.username == body.username && i.userpassword == body.password && i.e_mail == body.useremail){

      //i后面的名字要对应数据库的列名，body后面的名字对应form表单的name

        Login = true
        break
      }else {
        Login = false
      }
    }
    if (Login) {
      req.session.username=req.body.username;//登录成功设置session
     res.redirect('/index')
    }else{
      res.setHeader('Content-Type','text/HTML;charset=utf-8')
        res.end('<h1><a href = "/login">登录失败，请重试</a></h1>')
    }
  })
})

router.get('/index',(req,res) =>{
  res.render("index")
})

  router.get('/', function(req, res, next) {
    if(req.session.username){
      res.render('index',{username:req.session.username});//判断session状态，如果有效则返回主页，无效返回登录页面
    }else
    res.render('login');
   });

  router.get('/loginout',function(req,res){
       req.session.username = null;//退出登录删除session
       res.redirect('login');
  })

 
  router.get("/list3",(req,res)=>{
    connection.query('select user_id from user where username = ?',[req.session.username],function(err,result){
      if(err){
        console.log('select fail' +err);
        return
      }
      let useid = result[0].user_id//通过用户名寻找用户id
    connection.query('select article_id,article_title from article where user_id =? ',[useid],function(err,result){
        if(err){
          console.log('select fail' +err);
          return
        }
        res.render("list3",{date:result})
    })
  })

  })
 
 
module.exports = router;