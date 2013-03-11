var passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
    done(null, { id: 'demo', name: 'caridy' });
}));

var initialize = passport.initialize();

module.exports = function (req, res, next) {
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    initialize(req, res, function (err) {
        if (err) {
            return next(err);
        }
        // attaching passport object into req.passport
        // so this could be used at the controller level
        req.passport = passport;
        // returning control back to mojito flow
        next();
    });
};
