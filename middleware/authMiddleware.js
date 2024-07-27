const jwt = require('jsonwebtoken');

function authverify(req, res, next) {
    var incomimg_token = req.cookies;
    console.log(incomimg_token);
    if (!incomimg_token) {
        // res.status(400).send("No token");
        res.redirect("/signup");
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.redirect("/login");
    }
    // console.log(incomimg_token);/
    jwt.verify(incomimg_token['X-Auth-Token'], 'This is supposed to be secret , made with <3 by tba', (err, decodedtoken) => {
        if (err) {
            // console.log(err);
            res.redirect("/login");
        }
        else {
            console.log(decodedtoken);
            next();
        }
    });
}

module.exports.authverify = authverify;
