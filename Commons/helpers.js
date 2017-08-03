module.exports = {
    respondOk: function (context, body) {
        body.ok = true;
        context.res = {
            status: 200,
            body: body
        };
        context.done();
    },
    respondError: function (context, message) {
        context.res = {
            status: 400,
            body: {
                ok: false,
                message: message
            }
        };
        context.done();
    }
}