const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(400).send({ status:false,message: "token not present" })}

    jwt.verify(token, "divyaGrv-BonusProject-4-secret-key", (err,decode) => {
      if (err) {
        return res.status(401).send({ status:false, message:"token is invalid"})
	}else{
		req.decode = decode;
		return next(); 
	}
    })
} catch (error) {
    return res.status(500).send({ status:false,error: error.message });
  }
}


const authorization=async function(req,res,next){
  try {
    if(req.decode.role!="Admin"){
         return res.status(403).send({message:"you are not authorised"})}
    if(req.decode.role!="Super Admin"){
         return res.status(403).send({message:"you are not authorised"})}
    next();

} catch (error) {
    return res.status(500).send({ status:false,error: error.message });
  }
}

module.exports={authentication,authorization}