const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Router} = require("express");

const User = require("../models/user");

const loginRouter = Router();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
loginRouter.post("/", async function (req, res, next) {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        const passwordCorrect = (
            user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)
        );

        if (user === null || passwordCorrect === false) {
            throw {name: "InvalidKey"};
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        };

        const token = jsonWebToken.sign(
            userForToken,
            process.env.SECRET
        );

        res.status(200).send({
            name: user.name,
            token,
            username: user.username
        });
    } catch (err) {
        next(err);
    }
});

/* -------------------------------------------------------------------------- */
/*                                ERROR HANDLER                               */
/* -------------------------------------------------------------------------- */
loginRouter.use(function (err, req, res, next) {
    if (err.name === "InvalidKey") {
        res.status(401).json({
            error: "Invalid username or password"
        });
    }
    next(err);
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
module.exports = Object.freeze(loginRouter);