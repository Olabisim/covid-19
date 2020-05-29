var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


var positiveSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    positive: { type: String, required: true, unique: true }
})


positiveSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Positive", positiveSchema);