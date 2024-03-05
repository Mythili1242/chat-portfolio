const usersmodel=require("../models/usersmodel")

const data=async (req,res,next)=>{
    res.send({'as':"sa"})

}



const signup=async (req,res,next)=>{
    try{
        console.log(req.body);
await usersmodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
res.json("user created")
    }
    catch(err){
        console.log(err)
    }

}



const checkuname=async (req,res,next)=>{
    try{
console.log(req.body);
let a=await usersmodel.find({uname:req.body.uname})
console.log(a)
if(a[0]==null){
    res.json("not");
}
else{
    res.json("exists")
}
    }
    catch(err){
        console.log(err);
    }
}



const loginSubmit=async(req,res,next)=>{
    try{
console.log(req.body);
const {uname,pwd}=req.body;
const user=await usersmodel.find({uname:uname})
console.log(user)

if(user&& user.length==0){
    console.log("first")
    res.json("user not exists")
    console.log("user not exists")
}
else if(pwd==user[0].pwd){
        console.log("sec")
        res.json("Authorized user");
        console.log("authorized")
    }
else{
    res.json("Incorrect password")
}
    }
    catch(err){
        console.log(err)
    }
}    





module.exports={data,signup,checkuname,loginSubmit}
