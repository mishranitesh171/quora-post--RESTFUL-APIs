const express = require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
let port= 8080;
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express. json());
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"/public/css")));
 let posts=[
    {id:uuidv4(),
        username:"nitesh",
        content:" i am learnig web dev"    },
        { id:uuidv4(),
            username:"ram",
            content:" i am lookin for job in node js domain"    },
            {id:uuidv4(),
                username:" shyam",
                content:" i am doing intership in infotech"    }
                    

 ]

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
  })
  app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
  
    let post=posts.find((p)=>id===p.id);
  
    res.render("show.ejs",{post})
  })
  app.post("/posts",(req,res)=>{
   
    let {username,content}=req.body;
    let id =uuidv4();
    posts.push({ id,username,content});
    res.redirect("/posts")
  })
  app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
let post=posts.find((p)=> id === p.id);
post.content=newcontent
    console.log(post);
res.redirect("/posts");

  })
  app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post})
  })

app.listen(port,()=>{
    console.log(`server is listening at ${port}`);

})