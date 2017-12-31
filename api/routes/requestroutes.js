'use strict';
module.exports = function(app) {
    var requests = require("../controllers/requestcontroller");

    app.route("/requests")
        .get(requests.list_all_requests)
        .post(requests.create_request);

    app.route("/request/:requestId")
        .get(requests.get_request_details)
        .put(requests.update_request)
        .delete(requests.delete_request);
};
