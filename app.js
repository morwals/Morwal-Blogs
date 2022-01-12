require("dotenv").config();
const express =require("express");
const bodyParser= require("body-parser");
const ejs =require("ejs");
const _=require("lodash");

const aboutContent="Sumit Morwal is the developer";
const contactContent="Palwal, Haryana";

const app=express();



app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const connection=require("./database/connection");
const model=require("./database/model");


app.get("/",function(req,res){
    model.blog.find().then(data=>{
        res.render("home",{allposts:data});
    }).catch(err=>{
        console.log(err);
    })
});

app.get("/about",function(req,res){
res.render("about",{abt:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{con:contactContent});
});

app.get("/addblog",function(req,res){
    res.render("addblog");
});

app.get("/addblogs",function(req,res){
    res.render("addblog");
});

app.post("/addblogs",function(req,res){
    res.render("addblog");
})
//express routing parameters
app.get("/post/:topic",async function(req,res){
    await model.blog.find({title:req.params.topic},function(err,docs){
        if(err)console.log("Errr");
        else{
            console.log(docs[0].title);
            // console.log(req.params.topic);
            res.render("post",{ttl:docs[0], cntnt:docs[0]});
        }
    }).clone();
        
});


app.post("/addblog",function(req,res){

    
    const newpost={
        title: req.body.in,
        content: req.body.postbody
    };
    //save on db
    var blog=new model.blog(newpost);
    blog.save(blog).then(data=>{
        console.log("blog saved in db");
        console.log(data);
    }).catch(err=>{
        console.log("opps error in inesrting in db");
    });
    res.redirect("/");
});

app.post("/contact",function(req,res){

    res.redirect("/contact");
});
app.post("/about",function(req,res){

    res.redirect("/about");
});
app.post("/",function(req,res){

    res.redirect("/");
});

// delete post

app.get("/delete-post/:id",function(req,res){
    console.log(req.params.id);
    model.blog.findByIdAndDelete(req.params.id,function(err){
        if(err)console.log("error while deleting the blog");
        else{
            res.redirect("/");
        }
    })
});



let port=process.env.PORT;

if(port==null || port==""){
    port=3000;
}

app.listen(port);