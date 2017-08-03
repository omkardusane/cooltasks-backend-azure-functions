let getDb = require('../Commons/db');
let helpers = require('../Commons/helpers');

module.exports = function (context, req) {
    context.log('Create');
    require('../Commons/UserService')(context, req, function () {
        if (req.body.what && req.body.due) {
            let data = {
                what: req.body.what,
                due: req.body.due,
                createdOn: new Date().getTime(),
                owner: req.username,
                pending:true
            }
            getDb(function (db) {
                db.tasks.insert(data, function (err1, insertionResult) {
                    if (!err1 && insertionResult.result.ok == 1 && insertionResult.result.n == 1 ) {
                        context.log('Insertion : ',insertionResult.ops[0]);
                        let task = insertionResult.ops[0];
                        task._id = task._id.toString(); // serialize manually
                        helpers.respondOk(context, {
                            message: 'created one',
                            task : task
                        });
                    } else {
                        helpers.respondError(context, "Could not insert");
                    }
                });
            });
        } else {
            helpers.respondError(context, "Missing params");
        }
       
    });
};