module.exports = function(context, req, next){
	if(req.headers && req.headers.username){
		req.username = req.headers.username;
		next();
	}else{
		context.res = {
			status: 401,
			message: 'No username present in headers'	
		}
		context.done();
	}
}