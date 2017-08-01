module.exports = function (context, req) {
    context.log('Delete ');
    
    require('../Commons/UserService')(context, req, function(){
        
        if( req.body.id ){
            let id = req.body.id; // id of the task to be updated
            // Delete this data from using the id and username
            // then        
            context.res = {
                status:200,
                body:{
                    ok:true,
                    deleted:1,
                    message:'deleted one'
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