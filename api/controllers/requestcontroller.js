'use strict';

var mongoose = require('mongoose'),
    request = mongoose.model('Requests');

exports.list_all_requests = function(req, res) {
    request.find({}, function(err, requests) {
        if (err) res.send(err);
        res.json(requests);
    });
};

exports.create_request = function(req, res) {
    var new_request = new request(req.body);
    new_request.save(function(err, request) {
        if (err) res.send(err);
        res.json(request);
    });
};

exports.get_request_details = function(req, res) {
    request.findById(req.params.requestId, function(err, request) {
        if (err) res.send(err);
        res.json(request);
    });
};

exports.update_request = function(req, res) {
    request.findOneAndUpdate({_id: req.params.requestId}, req.body, {new: true}, function(err,request) {
        if (err) res.send(err);
        res.json(request);
    });
};

exports.delete_request = function(req, res) {
    request.remove({_id: req.params.requestId}, function(err, request) {
        if (err) res.send(err);
        res.json({ message: 'Request successfully deleted' });
    });
};

exports.volunteer = function(req, res) {
    const requestId = req.body.requestId.toString();
    const mealIndex = parseInt(req.body.mealIndex.toString());
    const volunteerId = req.body.volunteerId.toString();
    request.findById(requestId, function(err, req) {
        if (err) res.send(err);
        var jsonRequest = req.toJSON();
        var meal = jsonRequest.meals[mealIndex];
        meal = Object.assign(meal, { "volunteer": volunteerId });
        jsonRequest.meals[mealIndex] = meal
        request.findByIdAndUpdate(requestId, jsonRequest, {new: true}, function(err,request) {        
            if (err) res.send(err);
            res.json(request);

        });
    });
}