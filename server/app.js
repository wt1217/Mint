// 加载Express模块
const express = require('express');

// 加载cors模块
const cors = require('cors');

// 加载body-parser中间件
const bodyParser=require('body-parser');

// 加载Mysql模块
const mysql = require('mysql');
// 创建Mysql连接池
const pool=mysql.createPool({
  host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
  database:'xzqa',
  charset:'utf8',
  connectionLimit:20
})

// 创建Express对象
const server = express();

server.use(bodyParser.urlencoded({
	extended:false
}))

// 使用cors模块
server.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080']
}));

// 获取文章分类信息的接口
server.get('/category',(req,res)=>{
  let sql = 'SELECT id,category_name FROM xzqa_category';
  // 执行SQL语句
  pool.query(sql,(err,results)=>{
    if(err) throw err;
    res.send({message:'查询成功',code:1,results:results});
  });
  // res.send('ok');
})

//获取文章信息
server.get('/articles',(req,res)=>{
  //接收URL的参数 -- cid表示分类ID
  let cid = req.query.cid; 
  //接收URL的参数 -- page表示当前页码
  let page = req.query.page;
  //声明变量,用于设置每页显示的记录数，假定为20
  let pagesize = 20;
  //根据每页显示的记录数量及当前页码来计算offset参数值
  let offset = (page - 1) * pagesize;
  
  // 统计某一分类下包含的文章总数
  let sql='SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';
  pool.query(sql,[cid],(err,results)=>{
	  if(err) throw err;
	  let rowcount=results[0].count;
	  let pagecount=Math.ceil(rowcount/pagesize);
	  sql='SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT ' + offset + ',' + pagesize;
	  pool.query(sql,[cid],(err,results)=>{
	    if(err) throw err;
	    res.send({message:'查询成功',code:1,results:results,pagecount:pagecount});
	  });
  })
});

// 获取指定文章的相关信息
server.get('/article',(req,res)=>{
	let id=req.query.id;
	let sql="SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id=u.id WHERE r.id=?";
	pool.query(sql,[id],(err,results)=>{
		if(err) throw err;
		res.send({message:"查询成功",code:1,result:results[0]})
	})
})

//用户注册的接口
 server.post('/register',(req,res)=>{
   // 1.获取客户端提交的用户名和密码
   let username = req.body.username; 
   let password = req.body.password;
   let sql = 'SELECT id,username FROM xzqa_author WHERE username=?';
   pool.query(sql,[username],(err,results)=>{
     if(err) throw err;
     // 2.以当前的用户名为条件进行查找操作,如果未找到,则
     if(results.length==0){
       // 3.将用户信息写入数据表,(还需要注意将密码变成md5的结果)
     sql = 'INSERT INTO xzqa_author(username,password) VALUES(?,MD5(?))';
     pool.query(sql ,[username,password],(err,results)=>{
         if(err) throw err;
         res.send({message:'注册成功',code:1})
     });
     }else{
       // 3.如果找到，则直接产生错误响应信息到客户端
       res.send({message:'用户名已经存在',code:0});
     }
   })
 })

// 用户登录的接口
server.post('/login',(req,res)=>{
  // 1.获取用户名和密码
  let username = req.body.username; 
  let password = req.body.password;
  // 2.以用户名和密码为条件进行查找
  let sql = 'SELECT id,username,nickname FROM xzqa_author WHERE username=? AND password=MD5(?)';
  pool.query(sql,[username,password],(err,results)=>{
    if(err) throw err;
    if(results.length==0){
      res.send({message:'登录失败',code:0});
    }else{
      res.send({message:'登录成功',code:1});
    }
  })
})

// 指定监听端口号
server.listen(3000,()=>{
  console.log('serve is runing...')
});