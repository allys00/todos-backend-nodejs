const { User, validate } = require("../models/User.model");
const bcrypt = require('bcrypt');

const GetCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
};

const CreateUser = async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    
    await user.save();

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
};

module.exports = {
    GetCurrentUser,
    CreateUser
};