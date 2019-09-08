const { User } = require('../models/User.model');
const { validateLogin } = require('../models/User.model');
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).send({ error_message: "Usuário não encontrato" });
    const passwordOk = await bcrypt.compare(req.body.password, user.password);
    if (passwordOk) {
        const token = user.generateAuthToken();
        res.status(200).send({ token });
    } else {
        res.status(400).send({ error_message: "Senha incorreta" });
    };
};

module.exports = {
    Login
}