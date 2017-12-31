'use strict';
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var requestSchema = new schema({
    request_for: [{
        name: {
          type: String,
          required: "Please enter the person(s) who you are requesting a meal for."
        },
        address: {
            type: String,
            required: "Pleaes enter an address where the meal should be delivered."
        },
        home_phone: {
            type: String
        },
        cell_phone: {
            type: String
        },
        email: {
            type: String
        },
        best_contact_method: {
            type: String,
            enum: ["email", "home phone", "cell phone", "facebook"]
        },
        food_allergies: [{
            type: String
        }]
    }],
    reason: {
        type: String,
        enum: ["illness", "birth", "death", "other"]
    },
    reason_other: {
        type: String
    },
    notes: {
        type: String
    },
    meals: [{
        eventDate: {
            type: Date,
            required: "Please select a date for this meal"
        },
        volunteer: {
            type: mongoose.Schema.Types.ObjectId
        },
        requested_meal: {
            type: String
        },
        meal: {
            type: String
        }        
    }]
});

module.exports = mongoose.model("Requests", requestSchema);
