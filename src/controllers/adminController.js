const employeeModel=require("../model/employeeModel")
const passwordHash = require('password-hash');
const valid=require("../validation/joiValidation")
const jwt = require("jsonwebtoken");

//<<<<<<<<<<<<<<============================create employee======================================>>>>>>>>>>>>>>

const createEmployee=async(req,res)=>{
try {
	    data=req.body
	    let error = 0
	    const validation = await valid.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })
	
	    if (!validation) {
            return res.status(400).send({ status: false, message: `${error}` })}
	
	    const findInDb=await employeeModel.findOne({email:data.email})
	    if(findInDb) {
             return res.status(400).send({status:false, msg:"email already exist"})}
	
	    let hashedPassword = passwordHash.generate(data.password);
	
	    data.password=hashedPassword
	
	    const createData=await employeeModel.create(data)	
	    return res.status(201).send({status:true,msg:createData})
} catch (error) {
	return res.status(500).send({ status:false ,error: error.message });
}
}

//<<<<<<<<<<<<<<<==================================login=========================================>>>>>>>>>>>>>>>>>>

const logIn=async(req,res)=>{
 try {
	   data=req.body
	    let error = 0
	    const validation = await valid.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })
	
	    if (!validation){
             return res.status(400).send({ status: false, message: `${error}` })}
	
	    const findInDb=await employeeModel.findOne({email:data.email})
	    if(!findInDb){
         return res.status(400).send({status:false,msg:"no data found"})}
	
	       let Password=findInDb.password
	       let password=data.password
		
	    let verifyPassword=  passwordHash.verify(password, Password)
	    if(!verifyPassword){
               return res.status(400).send({status:false,msg:"password is incorrect"})}
	
	    let token=jwt.sign({
            id:findInDb._id,
            role:findInDb.role},
            "divyaGrv-BonusProject-4-secret-key")
	
	      return res.status(200).send({status:true,msg:token})
	
} catch (error) {
	return res.status(500).send({ status:false,error: error.message });
}
}

module.exports={createEmployee,logIn}