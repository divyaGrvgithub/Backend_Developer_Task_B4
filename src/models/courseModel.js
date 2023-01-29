const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    topicsArray: {
        type: Array,
        required: true
    },
    duration: {
        type: String,
        raquired: true
    },
    category: {
        type: String,
        raquired: true
    },
    adminId: {
        type: objectId,
        ref: "employee"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAprovved: Boolean
}, { timestamps: true })

module.exports = mongoose.model("course", courseSchema)