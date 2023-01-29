const express=require("express")
const router=express.Router()
const adminController=require("../controllers/admincontroller")
const courseController=require("../controller/courseController")
const auth=require("../middleware/auth")

// <<<<<<<<<<<<<<<<==============Admin Controller Api==========================>>>>>>>>>>>>>>>>>>>

router.post("/createEmployee",adminController.createEmployee)
router.post("/login",adminController.logIn)

// <<<<<<<<<<<<<<<<==============Course Controller Api==========================>>>>>>>>>>>>>>>>>>>

router.post("/createcourse",auth.authentication,auth.authorization,courseController.createCourse)
router.get("/getData",auth.authentication,courseController.getdata)
router.put("/updateCourse",auth.authentication,auth.authorization,courseController.updateCourse)
router.delete("/deleteData",auth.authentication,auth.authorization,courseController.deleteData)
router.put("/approvedCourse/:courseId",auth.authentication,auth.authorization,courseController.approvedCourse)

module.exports=router
