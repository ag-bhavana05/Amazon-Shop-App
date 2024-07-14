const mongoose = require("mongoose");

const {DATABASE} = require("../config/keys");

mongoose.connect(DATABASE).then(() => console.log("database connected")).catch((error) => console.log("error" + error.message))