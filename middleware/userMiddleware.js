const jwt = require('jsonwebtoken');
const user = require('../models/user');

function userverify(req, res, next) {
    var incomimg_token = req.cookies;
    console.log(incomimg_token);
    if (!incomimg_token) {
        // res.status(400).send("No token");
        // res.redirect("/signup");
        next();
        return;  
    }
    else if (!incomimg_token['X-Auth-Token']) {
        next();
        return;
    }
    // console.log(incomimg_token);/
    else{jwt.verify(incomimg_token['X-Auth-Token'], 'This is supposed to be secret , made with <3 by tba', async (err, decodedtoken) => {
        if (err) {
            // console.log(err);
            // res.redirect("/login");
        }
        else {
            console.log(decodedtoken);
            // const usr = await user.findById(decodedtoken.user_id).exec();
            // console.log(usr);
            // res.locals.user = usr.username;
            res.locals.user = decodedtoken;
            // console.log(res);//auth->locals->user
        }})
    };
    next();
}

module.exports.userverify = userverify;
