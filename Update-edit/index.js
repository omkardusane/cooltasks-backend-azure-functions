let getDb = require('../Commons/db');
let helpers = require('../Commons/helpers');
let ObjectID = getDb.ObjectID ;

module.exports = function (context, req) {
    context.log('Update Edit');

    require('../Commons/UserService')(context, req, function () {
        if (req.body.id) {
            let id = req.body.id; // id of the task to be updated
            let data = {
                updatedOn: new Date().getTime(),
            }
            if (req.body.what) {
                data.what = req.body.what;
            }
            if (req.body.due) {
                data.due = req.body.due;
            }
            // Update this data into db uding the id and username
            getDb(function (db) {
                db.tasks.update({
                    _id: new ObjectID(id),
                    owner: req.username
                }, {
                        $set: data
                    }, function (err1, updateResult) {
                        if (!err1 && updateResult && updateResult.result.ok == 1  && updateResult.result.nModified == 1 ) {
                            helpers.respondOk(context, {
                                message: 'Updated one'
                            });
                        } else {
                            helpers.respondError(context, "Could not update");
                        }
                    });
            });
        } else {
            helpers.respondError(context, "Missing Id");
        }
    });

};