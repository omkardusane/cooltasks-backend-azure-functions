module.exports = function (context, req) {
    context.log('Update Complete');
    
    require('../Commons/UserService')(context, req, function(){
        
        if( req.body.id ){
            let id = req.body.id; // id of the task to be updated
            let data = {
                updatedOn: new Date().getTime(),
                pending:false
            }
            // Update this data into db uding the id and username
            // then        
            context.res = {
                status:200,
                body:{
                    ok:true,
                    completed:1,
                    message:'completed one'
                }
            };   
            context.done();
        }else{
            context.res = {
                status:400,
                body:{
                    ok:false,
                    message:'missing id'
                }
            }   
            context.done();
        }
    });
    
};