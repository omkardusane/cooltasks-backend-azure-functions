let getDb = require('../Commons/db');
let helpers = require('../Commons/helpers');

module.exports = function (context, req) {
    context.log('Get All');
    require('../Commons/UserService')(context, req, function () {
        let owner = req.username; // this is the user
        // find all the tasks of this user from the db
        getDb(function (db) {
            db.tasks.find({ owner: owner }, {
                _id: 1,
                what: 1,
                due: 1,
                createdOn: 1,
                updatedOn: 1,
                owner: 1,
                pending: 1
            }).toArray(function (err1, docs) {
                if (!err1) {
                    let list = docs.map(doc=> {
                        doc._id = doc._id.toString();
                        return doc;
                    });
                    helpers.respondOk(context, {
                        message: 'here are all the tasks',
                        tasks: list
                    });
                } else {
                    helpers.respondError(context, "Could not find anything");
                }
            });
        });
    });
};