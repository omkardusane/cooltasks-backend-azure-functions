let getDb = require('../Commons/db');
let helpers = require('../Commons/helpers');
let ObjectID = getDb.ObjectID;

module.exports = function (context, req) {
    context.log('Delete ');

    require('../Commons/UserService')(context, req, function () {

        if (req.body.id) {
            let id = req.body.id; // id of the task to be updated
            // Delete this data from using the id and username
            getDb(function (db) {
                db.tasks.remove({
                    _id: new ObjectID(id),
                    owner: req.username
                }, function (err, deleted) {
                        context.log("DELETED: ", deleted);
                        if (!err && deleted.result.ok == 1 && deleted.result.n == 1) {
                            helpers.respondOk(context, {
                                message: 'deleted one',
                            });
                        } else {
                            helpers.respondError(context, "Could not delete. maybe no such doc exists or some other db reason");
                        }
                    });
            })
        } else {
            helpers.respondError(context, "Missing params");
        }
    });

};