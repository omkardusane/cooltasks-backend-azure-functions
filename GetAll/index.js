module.exports = function (context, req) {
    context.log('Get All');
    
    require('../Commons/UserService')(context, req, function(){
        let owner = req.username ; // this is the user
        // find all the tasks of this user from the db
        context.res = {
            status: 200,
            body: 
            { 
                ok:true,
                message: "Here's the list of tasks",
                tasks:[
                    {
                        "_id": "597b8dc323e70f13546a87b4",
                        "what": "eat kiwi",
                        "due": "18/07/2018",
                        "pending": true,
                        "createdOn": 1501269443472
                    },
                    {
                        "_id": "597b8dc323e70f13546a87b5",
                        "what": "eat apples",
                        "due": "18/07/2018",
                        "pending": true,
                        "createdOn": 1501267443472
                    },
                    {
                        "_id": "597b8dc323e70f13546a97b5",
                        "what": "eat Bananas",
                        "due": "18/07/2018",
                        "pending": false,
                        "createdOn": 1501267443472
                    }
                ]
            }
        };
        context.done();
    });
};