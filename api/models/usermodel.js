'use strict';
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userSchema = new schema({
    first_name: {
        type: String,
        required: "Please enter your first name"
    },
    last_name: {
        type: String,
        required: "Please enter your last name"
    },
    email: {
        type: String,
        required: "Please enter your email address"
    },
    home_phone: {
        type: String,
        required: "Please enter a home phone number"
    },
    cell_phone: {
        type: String,
        required: "Please enter a cell phone number"
    },
    best_contact_method: {
        type: [{
            type: String,
            enum: ["email", "home phone", "cell phone", "facebook"]
        }],
        default: ["email"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    oauth_id: {
        type: String,
        required: "Please provide an oauth id"
    }
});

module.exports = mongoose.model("Users", userSchema);
