const courseModel=require("../models/courseModel")
const axios=require("axios")
const {courseJoi} =require("../validation/joiValidation")

//<<<<<<<<<<<<<<<<<<<<<<<<<<=============create Course=======================>>>>>>>>>>>>>>>>>>>>>>

const createCourse=async (req,res)=>{
try {
	    let data=req.body	
	    let error = 0

	    const validation = await courseJoi.validateAsync(data).then(() => true).catch((err) => { error= err.message; return null })	
	    if (!validation) return res.status(400).send({ status: false, message: `${error}` })
	
	    const isUrlExist = await axios.get(data.videoUrl).then(() => data.videoUrl).catch(() => null);
	
	    if (!isUrlExist) {
             return res.status(404).send({ status: false, message: "url doesn't exist" })};
	
	    const createData=await courseModel.create(data)
	    return res.status().send({msg:createData})
} catch (error) {
	return res.status(500).send({ error: error.message });
}
}

//<<<<<<<<<<<<<<<<<<<<<=======================get course==================>>>>>>>>>>>>>>>>>>>>>>>>

const getdata= async (req,res)=>{
    try {       
            const findData=await courseModel.find({isAprovved:true}).sort({category:1})
            if(findData.length==0)  { 
                return res.status(404).send({ status: false, message: "no data found" })}
            else{
                return res.status(200).send({status:true,msg:findData})}
    } catch (error) {
        return res.status(500).send({status:false, error: error.message });
    }    
    }
    

//<<<<<<<<<<<<<<<<<<<<====================update Course================>>>>>>>>>>>>>>>>>>>>

const updateCourse=async(req,res)=>{
try {
	    let data=req.body	     
	    if(Object.keys(data).includes("videoUrl")){
	        const isUrlExist = await axios.get(data.videoUrl).then(() => data.videoUrl).catch(() => null);
	    
	    if (!isUrlExist) { 
            return res.status(404).send({ status: false, message: "url doesn't exist" })};
        }
	
	    const findData=await courseModel.findOne({adminId:req.decode.id,isDeleted:false})
	    if (!findData) {
             return res.status(404).send({ status: false, message: "no data found" })};
	
	    const updateData=await courseModel.updateMany({adminId:req.decode.id},data)
	    return  res.status(200).send({status:true,data:updateData})
} catch (error) {
	return res.status(500).send({status:false, error: error.message });
}
}


//<<<<<<<<<<<<<<<<<<====================delete course====================>>>>>>>>>>>>>>>>>>>>

const deleteData=async(req,res)=>{
try {
	    const findData=await courseModel.findOne({adminId:req.decode.id,isDeleted:false})
	    if (!findData) {
             return res.status(404).send({ status: false, message: "no data found" })};
	    
	    const deleteData=await courseModel.updateMany({adminId:req.decode.id},{isDeleted:true})
	    return res.status(200).send({status:true,msg:"deleted successfully",deleteData})
} catch (error) {
	return res.status(500).send({ status:false, error: error.message });
}
}

//<<<<<<<<<<<<<<<<<<<<<=====================approve course=================>>>>>>>>>>>>>>>>>>>>>>

const approvedCourse=async(req,res)=>{    
try {
	    const findData=await courseModel.findOne({_id:req.params.courseId,isDeleted:false})
	    if (!findData) { 
            return res.status(404).send({ status: false, message: "no data found" })};
	
	    const updateData=await courseModel.findOneAndUpdate({_id:req.params.courseId},{isAprovved:true},{new:true})	
	    return  res.status(200).send({status:true,data:updateData})
} catch (error) {
	return res.status(500).send({status:false,  error: error.message });
}
}

//<<<<<<<<<<<<<<<<<<<<==============export================>>>>>>>>>>>>>>>>>>>>

module.exports={createCourse,getdata,updateCourse,deleteData,approvedCourse}