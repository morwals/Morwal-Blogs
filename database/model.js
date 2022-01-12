const mongoose=require("mongoose");

const blogs=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    }
});

const users=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    passward:{
        type:String,
        required:true
    }
});

const user=mongoose.model("user",users);
const blog=mongoose.model("blog",blogs);

module.exports={
    user,
    blog
}