const auth = require('../../../auth');
module.exports = function checkAuth(action) {

    function middleware(req,res,next) {
        switch(action) {
            case 'createProduct':
                const owner = req.body.clpr_clientid;
                auth.check.own(req, owner);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}