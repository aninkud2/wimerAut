// const jwt=require("jsonwebtoken")
// const userModel=require("../model/usermodel")
// const authentication=async(req,res,next)=>{
//     try {
    
//     const user=await userModel.findById(req.params.id)
   
//     const userToken=user.token
    
//     if(!userToken){
//         res.status(400).json(
//            "Token not found" 
//         )
//     }
    
//     await jwt.verify(userToken,process.env.secretkey,(err,payLoad)=>{
//         if(err){res.json(err.message)}
//         else{
//            req.user=payLoad 
//            //console.log(req.user)
//            next();
//         }
//     })

// } catch (error) {
//     res.json(error.message)
// }

// }

// exports.CheckUser=async(req,res,next)=>{
//     authentication(req,res,async()=>{
// const users=await userModel.findById(req.params.id)

//      if(users.isAdmin){
//         next()
//     } else{
//        res.json("you are not authorized to permorm this action @")
//      }
//     })
       
    
//        }
   
const jwt=require("jsonwebtoken")
const User = require("../model/usermodel")
const dotenv=require("dotenv")
dotenv.config()
const autheticator=async(req,res,next)=>{
const  newUser=await User.findById(req.params.id)
const token=newUser.token
await jwt.verify(token,process.env.secretkey,(err,payLoad)=>{
   
    if(err){res.json(err.message)}
    else{
        req.user=payLoad
        next()
    }
    console.log(req.user)
   
})


}


const isAdminauthorized=(req,res,next)=>{
    autheticator(req,res,next(async()=>{
        const existingUser=await User.findById(req.params.id)
        if(existingUser.isAdmin==false){
res.json("you are not authorized because you are not an admin")
        }
        else{
            next()
        }
    }))
}

const isSuperAdminauthorized=(req,res,next)=>{
    autheticator(req,res,(async()=>{
        const existingUser=await User.findById(req.params.id)
        if(existingUser.isSuperAdmin==true && existingUser.isAdmin==true){
next()
        }
        else{
            res.json("you are not authorized because you are not a superadmin")
        }
    }))
}
module.exports={isAdminauthorized,isSuperAdminauthorized}