var mongoose=require("mongoose");
var {Schema}=mongoose;

const usersSchema=new Schema({
    uname:String,
    email:String,
    pwd:String
})

const users=mongoose.model("users",usersSchema);
module.exports=users;
