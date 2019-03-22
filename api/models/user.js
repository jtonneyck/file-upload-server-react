const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    profilePicture: {type: String, default: "https://media0.giphy.com/media/vlyLquhQX8muQ/giphy.gif"}
})

module.exports = mongoose.model("User", userSchema)