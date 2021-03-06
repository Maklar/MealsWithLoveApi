'use strict';

var mongoose = require('mongoose'),
    user = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    user.find({}, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    var new_user = new user(req.body);
    new_user.save(function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.get_user_details = function(req, res) {
    user.findById(req.params.userId, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.get_user_details_by_oauth = function(req, res) {
    user.findOne({ "oauth_id": req.params.oauthId }, function(err, user) {
        if(err) res.send(err);
        res.json(user);
    });
}

exports.update_user = function(req, res) {
    user.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err,user) {
        if (err) res.send(err);
        res.json(user);
    });
};

exports.delete_user = function(req, res) {
    user.remove({_id: req.params.userId}, function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};