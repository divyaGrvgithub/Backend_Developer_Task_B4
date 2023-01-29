const express = require("express")
const router = require("./routes/route.js")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://divyamala_:Dt25042000knp@divyamala.0cofsch.mongodb.net/divyaGrvBonus-4",{
    useNewUrlParser:true
})

.then(()=>console.log("MongoDB is Connected"))
.catch((err=>console.loh(err)))

app.use("/",router)

app.listen(process.env.Port||3000,()=>{
    console.log("Express App Running On Port",+(process.env.Port||3000))
})