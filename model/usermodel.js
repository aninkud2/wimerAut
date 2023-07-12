const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({

username:{type:String,required:true["username is required"]},
email:{type:String,unique:true,required:true["email is required"]},
password:{type:String,required:true["password is required"]},
token:{type:String},
isVerified:{type:Boolean,default:false},
isAdmin:{type:Boolean,default:false},
isSuperAdmin:{type:Boolean,default:false}
}    
)
const userModel=mongoose.model("user",userSchema)
module.exports=userModel