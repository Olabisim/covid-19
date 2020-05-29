var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


var negativeSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        negative: { type: String, required: true, unique: true }
})


negativeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Negative", negativeSchema);


