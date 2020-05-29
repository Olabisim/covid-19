var mongoose = require("mongoose");

var dislikeSchema = new mongoose.Schema({
    dislike: { type: String, required: true }
})

module.exports = mongoose.model("Dislike", dislikeSchema);
