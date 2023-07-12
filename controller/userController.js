const user=require("../model/usermodel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel = require("../model/usermodel")
const mailSender=require("./email")

exports.isAuth=async(req,res,next)=>{
 // const user=await userModel.findById(req.params.id)
  if (req.session.isAuth){
    
    next()
  }
  else{res.json("plz login")} 
}

exports.homepage=async(req,res)=>{
 
  res.json("Welcome to my  authentication api homepage" )
  
}
  //to signup
exports.newUser=async(req,res)=>{try {
 const{username,email,password}=req.body
    const salt=bcrypt.genSaltSync(10)
     const hashedPassword=bcrypt.hashSync(password,salt)
const data={username,
email,
password:hashedPassword
}
  const createduser=await user.create(data)
const token=jwt.sign(
{
id:createduser._id,
password:createduser.password
},process.env.secretkey,{expiresIn:"1d"}
)
createduser.token=token
const subject="KINDLY VERIFY"
const link=`${req.protocol}://${req.get("host")}/userverify/${createduser._id}`
const message=` Welcome onboard, kindly  use this link ${ link} to  verify your acct`
mailSender(
{
email:createduser.email,
 subject,
 message 
}
)
console.log(req.get("host"))
createduser.save()
 res.json({ message:"New user has been created",
data:createduser})
  } 
catch (error) {
    res.json(error.message)
}
}


//user verify
exports. userVerify=async(req,res)=>{
  try {
  const verified=await user.findByIdAndUpdate(req.params.id,{isVerified:true})
  if(!verified)res.json("Unable to verify this account")
  else{
    res.json(`user ${verified.email} has been verifed`)
  }
} catch (error) {
  res.json(error.message)
}

}


//to log in
exports.userLogin=async(req,res)=>{
  try {
   // const {username,password}=req.body
   const userpassword=req.body.password
const checkUsername=await user.findOne({$or:[{username:req.body.username},{email:req.body.email}]} )

if(!checkUsername )
return res.json("Username not found or in-correct")


const checkPassword=bcrypt.compareSync(userpassword,checkUsername.password)

if(!checkPassword)
   return res.json("Invalid password")


const usertoken=jwt.sign(
    {
    id:checkUsername._id,
    password:checkUsername.password,
    //isAdmin:checkUsername.isAdmin
    },process.env.secretkey,{expiresIn:"1d"}
    )
    
    checkUsername.token=usertoken
    checkUsername.save()

//     const{password,token,...veronica}=checkUsername._doc
// req.session.isAuth=true
res.json({Message:"Login sucessful",
data:checkUsername})

} catch (error) {
    res.status(500).json(error.message)
}

}
// get all
exports.getAll=async(req,res)=>{
  try {
    
    const autheticatedUser=await userModel.findById(req.params.id)
    const One=await userModel.find()
    res.status(200).json({
      message:`find all the users below`,
      data:One
    })
    
  } catch (error) {
    res.status(500).json({
      staus:"failed",
      error:error.message
    })
    
  }
}

// get one
exports.getOne=async(req,res)=>{
  try {
    const One=await userModel.findById(req.params.id)
    
    res.status(200).json({
      message:`find all the users below`,
      data:One
    })
    
  } catch (error) {
    res.status(500).json({
      staus:"failed",
      error:error.message
    })
    
  }
}
// update 
exports.updateUser=async(req,res)=>{
  try {
    
    const userid=req.params.userid
    const Duser=await user.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!Duser){res.json("unable to update user")}
    else{res.json({message:"user update sucessfully",data:Duser})}



    
  } catch (error) {
    res.json(error.message)
  }
}