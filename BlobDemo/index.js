module.exports = function (context, myBlob) {
    context.log("Name:", context.bindingData.name, 
    "\n Blob Size:", myBlob.length, "Bytes \n"+
    myBlob
    );
    context.done();
};