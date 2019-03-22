const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    profilePicture: {type: String, default: "public/images/giphy.webp"}
})

module.exports = mongoose.model("User", userSchema)