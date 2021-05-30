var express = require('express');
var router = express.Router();
let userid



var mysql = require('mysql');
var connection = mysql.createConnection({
      host:"localhost",
      port:"3306",
      user:"root",
      password:"019890",
      database:"zoey",
    });
  connection.connect();


router.get('/', function(req, res, next) {
  console.log(req.session.username);
  connection.query('select user_id from user where username = ?',[req.session.username],function(err,result){
    if(err){
      console.log('select fail' +err);
      return
    }
   
    console.log(result);
    userid=result[0].user_id
    res.render('input');
  })
    
  });


  router.get("/:id",function(req,res){
    let id = req.params.id//获取路径后面id的值
    connection.query('select * from article where article_id = ?',[id],function(err,result){
      if(err){
        console.log('select fail' +err);
        return
      }
      res.render('views',{data:result[0]})
    })
  })


  router.post('/add',function(req,res){
    var body = req.body
    connection.query('insert into article(user_id,article_title,article_content,article_weather,article_date) values(?,?,?,?,?)',[userid,body.t,body.x,body.w,body.d],function(err,result){
      if(err){
        console.log('select fail' +err);
        return
      }
      res.send('<script>alert("提交成功");window.location.href="/index";</script>')
    })
  })

  
  module.exports = router