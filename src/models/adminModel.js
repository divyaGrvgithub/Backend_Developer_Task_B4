const mongoose = require("mongoose")

const adminModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Employee"
    }
}, { timestamps: true })

module.exports = mongoose.model("admin", adminModel)