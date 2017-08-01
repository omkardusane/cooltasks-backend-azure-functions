module.exports = function (context, req) {
    context.log('Create');
    require('../Commons/UserService')(context, req, function(){
        
        if( req.body.what && req.body.due ){
            let data = {
                what : req.body.what,
                due : req.body.due,
                createdOn: new Date().getTime(),
                owner: req.username
            }
    
            // Insert this data into db
            // then        
            context.res = {
                status:200,
                body:{
                    ok:true,
                    task:data,
                    created:1,
                    message:'created one'
                }
            };   
            context.done();
        }else{
            context.res = {
                status:400,
                body:{
                    ok:false,
                    message:'missing params'
                }
            }   
            context.done();
        }
        
    });
    
};