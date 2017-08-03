let getDb = require('../Commons/db');
let helpers = require('../Commons/helpers');
module.exports = function (context, req, next) {
	if (req.headers && req.headers.username) {
		req.username = req.headers.username;
		getDb(function (db) {
			db.users.findOne({
				username: req.username
			}, function (err1, doc) {
					context.log("----- err ",err1);
					if (!err1) {
						if (doc == null) {
							db.users.insert({
								username: req.username
							}, function (err2, insertionResult) {
									if (!err2 && insertionResult.result.ok == 1 && insertionResult.result.n == 1) {
										next();
									} else {
										helpers.respondError(context, "User insertion error");
									}
								});
						} else {
							next();
						}
					} else {
						helpers.respondError(context, "cannot find the User");
					}
				});
		});
	} else {
		context.res = {
			status: 401,
			message: 'No username present in headers'
		}
		context.done();
	}
}