var mongoose = require("mongoose");

var likeSchema = new mongoose.Schema({
    like: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("Like", likeSchema);