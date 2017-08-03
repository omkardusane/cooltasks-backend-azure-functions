let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let db = false;
let url = "uri_for_mongodb_server";

module.exports = function (next) {
	if(db){
		db.reuse = true;
		next(db);
	}else{
		MongoClient.connect(url, function (err, DB) {
			let db = {
				close: DB.close,
				tasks: DB.collection('tasks'),
				users: DB.collection('users'),
				reuse: false,
			};
			next(db);
		});		
	}
}

module.exports.ObjectID = MongoDB.ObjectID ;
