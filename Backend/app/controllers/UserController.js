const User = require('../models/UserModel');
const bcrypt = require("bcrypt");

module.exports = {
    create: (req, res) => {

        User.findOne({ email: req.body.email })
            .then((response) => {

                if (response) {
                    return res.json({
                        error: true,
                        message: 'User already exists'
                    })

                }
            })

        User.findOne({ name: req.body.username })
            .then((response) => {

                if (response) {
                    return res.json({
                        error: true,
                        message: 'Name has been already taken'
                    })
                }
            })

        const newUser = new User(req.body)
        newUser.save({ new: true })
            .then((response) => {
                res.json(response)
                return res.status(200)
            })
            .catch((error) => {
                console.error(error);
            })
     },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {

                if (!user) {
                    res.json({
                        error: true,
                        message: "That user doesn't exist",
                        user: req.body,
                    });
                    return;
                }

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = user.generateAuthToken(user);
                    res.status(200).send(user);
                    console.log("User logged in")
                } else {
                    res.status(401).send({
                        message: "Invalid email/password"
                    })
                }
            });
    }
}