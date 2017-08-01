module.exports = function (context, req) {
    context.log('Update Edit');
    
    require('../Commons/UserService')(context, req, function(){
        if( req.body.id ){
            let id = req.body.id; // id of the task to be updated
            let data = {
                updatedOn: new Date().getTime(),
            }
            if(req.body.what){
                data.what= req.body.what; 
            }
            if(req.body.due){
                data.due= req.body.due; 
            }
            // Update this data into db uding the id and username
            // then        
            context.res = {
                status:200,
                body:{
                    ok:true,
                    updated:1,
                    message:'updated one'
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