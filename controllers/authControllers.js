const user = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.login=async function login(req,res){
    var name = req.body.username;
    var password = req.body.password;
    const loggingUser= await user.find({ 'name': name, 'password':password }).exec();
    console.log(loggingUser)
    if (loggingUser.length == 0) {
        res.status(403).send((await user.exists({ "name": name })) ? "Password Incorrect" : "User Doesn't Exists");
        return;
    }
    else {
        console.log({name,password})
    var user_id = loggingUser._id;
        var token = jwt.sign({ user_id: user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
        console.log(jwt.verify(token, 'This is supposed to be secret , made with <3 by tba'));
    res.cookie('X-Auth-Token', token, { maxAge: 86400000 });
        // res.redirect('/');
        res.status(200).end();
    }
}

module.exports.signup=async function signup(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body)
    if (await user.exists({ username })) {
        res.status(400).send("User Already Exists")
    }
    else {
        try {
            var usr = await user.create({ 'name':username, 'password':password });
            console.log(usr._id);
            var user_id = usr._id;
            var token = jwt.sign({ user_id }, 'This is supposed to be secret , made with <3 by tba', { expiresIn: '180d' });
            res.cookie('X-Auth-Token', token , {maxAge: 86400000});
            // res.status(201).json({ token, usr });
            res.redirect('/');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports.logout=function logout(req,res){
    res.cookie('X-Auth-Token', '', { maxAge: 1 });
    res.redirect('/')
}