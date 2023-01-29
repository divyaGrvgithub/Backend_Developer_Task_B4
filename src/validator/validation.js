const Joi=require("joi")

const userJoi=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().trim().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).message("please enter valid email"),
    password: Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password  should contain Min 8 character and 1 Special Symbol"),
    role:Joi.string().trim().required().valid("Admin", "Super Admin", "Employee")
})

const loginJoi=Joi.object({
    email:Joi.string().trim().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).message("please enter valid email"),
    password: Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("please enter valid password"),
})

const courseJoi=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    videoUrl:Joi.string().required(),
    topicsArray:Joi.array().required(),
    duration:Joi.string().required(),
    category:Joi.string().required(),
    adminId:Joi.required(),
    isDeleted:Joi.boolean(),
    isAprovved:Joi.boolean()
})

module.exports.userJoi=userJoi
module.exports.loginJoi=loginJoi
module.exports.courseJoi=courseJoi