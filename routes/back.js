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

router.get('/',function(req,res){
    connection.query('select * from user',function(err,result){
        if(err){
          console.log('select fail' +err);
          return
        }
    res.render('back',{data:result})
    })
  })

  router.get('/del',function(req,res){
      connection.query('delete from user where user_id = ?',req.query.id,function(err,result){
        if(err){
            console.log(err);
            return
          }
          res.redirect('/back')
        })
  })
   
  router.get('/manage',function(req,res){
      res.render('manage')
  })

  router.post('/manage',function(req,res){
    var body = req.body
    connection.query('select * from manage',function(err,result){
      if(err){
        console.log('select fail' +err);
        return
      }
      var Login = false
      for( i of result){
        if(i.manage_name == body.managename && i.manage_pas == body.managepassword){
          Login = true
          break
        }else {
          Login = false
        }
      }
      if (Login) {
        res.redirect('/back')
      }else{
        res.setHeader('Content-Type','text/HTML;charset=utf-8')
          res.end('<h1><a href = "/login">登录失败，请重试</a></h1>')
      }
    })
  })
    router.get('/',function(req,res,next){
         res.render('login')
    });







    router.get('/add',function(req,res){
      res.render('add')
    })
    
    router.post('/add',function(req,res){
      var body = req.body
      connection.query('select * from user', function(err,result){
        if (err) {
          console.log('select fail' + err);
          return
        }
        var Add = false
        for( i of result) {
            if (i.username === body.addname){
            Add = false
            break
          }else{
              Add = true
            }
          }
          if (Add) {
            connection.query('insert into user(user_id,username,userpassword,e_mail) values(null,?,?,?)',[body.addname,body.addpassword,body.addemail],function(err,result){
              if (err){
                console.log('insert fail' +err);
                return
              }
              connection.query('select * from user',function(err,result1){
                if(err){
                  console.log('select fail' +err);
                  return
                }
            res.render('back',{data:result1})
            })
            })
          }else {
            res.setHeader('Content-Type','text/HTML;charset=utf-8')
            res.end('<h1><a href = "/index">新增信息有误，请重新输入</a></h1>')
          }
      })
    })



    router.get('/edit',function(req,res){
      connection.query('SELECT * FROM user where user_id = ?',req.query.id,function(err,result){
        res.render('edit',{
          user_id:result[0].user_id,
          username:result[0].username,
          userpassword:result[0].userpassword,
          e_mail:result[0].e_mail
        })
      })
      //从数据库查询到where后面的id的数据传递给模板
    })
    
    router.post('/edit',function(req,res){
      var body = req.body
            connection.query('UPDATE user SET username = ? ,userpassword = ? ,e_mail = ? WHERE user_id = ?',[body.editname,body.editpassword,body.editemail,req.query.id],function(err,result){
              if (err){
                console.log('insert fail' +err);
                return
              }
              connection.query('select * from user',function(err,result2){
                if(err){
                  console.log('select fail' +err);
                  return
                }
            res.render('back',{data:result2})
            })
      })
    })
  module.exports = router;