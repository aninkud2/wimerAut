const{newUser,userLogin, getAll,updateUser,getOne,homepage,isAuth,userVerify}=require("../controller/userController")
//const {CheckUser}=require("../controller/authorization")
const{isAdminauthorized,isSuperAdminauthorized}=require("../controller/authorization")

const router=require("express").Router()
router.route("/").get(homepage) 
router.route("/signup").post(newUser)
router.route("/userverify/:id").put(userVerify)
router.route("/login").post(userLogin) 
router.route("/getall/:id").get(isSuperAdminauthorized,getAll) 
router.route("/getallW/:id").get(getAll) 
router.route("/single/:id").get(isAuth,getOne) 
// .patch(CheckUser,updateUser) 
//router.route("/:id/getone").get(CheckUser,getAll) 
module.exports=router     


