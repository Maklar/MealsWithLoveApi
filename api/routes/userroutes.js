'use strict';
module.exports = function(app) {
    var users = require("../controllers/usercontroller");

    app.route("/users")
        .get(users.list_all_users)
        .post(users.create_user);

    app.route("/user/:userId")
        .get(users.get_user_details)
        .put(users.update_user)
        .delete(users.delete_user);

    app.route("/user/oauth/:oauthId")
        .get(users.get_user_details_by_oauth);
};
