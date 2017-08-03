let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;

let url = "uri_for_mongodb_server";

let mongo = {
    connect: function (next) {
        MongoClient.connect(url, function (err, DB) {
            let db = {
                close: DB.close,
                tasks: DB.collection('tasks'),
                users: DB.collection('users'),
                test: DB.collection('test'),
            };
            next(db);
        });


    }
}



module.exports = function (context, req) {

    mongo.connect(function (db) {
        db.test.find().toArray(function (er2, docs) {
            docs = docs.map(a => { a._id = a._id.toString(); return a; });
            context.res = {
                isRaw: true,
                body: {
                    ok: true,
                    docs: docs,
                }
            }
            context.done();

        });
    });
};