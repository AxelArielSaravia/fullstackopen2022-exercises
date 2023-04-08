const bcrypt = require("bcrypt");
const {Router} = require("express");

const User = require("../models/user.js");

const usersRouter = Router();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
usersRouter.get("/", async function (req, res) {
    const users = (
        await User.find({}).populate("blogs", {
            author: 1,
            title: 1,
            url: 1
        })
    );
    res.json(users);
});

usersRouter.post("/", async function (req, res, next) {
    const {username, name, password} = req.body;
    try {
        if (password === undefined || username === undefined) {
            throw {name: "RequiredUserNameOrPassword"};
        }
        if (password.length < 3 || username.length < 3) {
            throw {name: "LengthRestrictionUserNameOrPassword"};
        }

        const existingUser = await User.findOne({username});

        if (existingUser !== null) {
            throw {name: "UniqueUsername"};
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const savedUser = await User.create({
            username,
            name,
            passwordHash,
        });
        res.status(201).json(savedUser);

    } catch (err) {
        next(err);
    }
});

/* -------------------------------------------------------------------------- */
/*                                ERROR HANDLER                               */
/* -------------------------------------------------------------------------- */
usersRouter.use(function (err, req, res, next) {
    if (err.name === "RequiredUserNameOrPassword") {
        res.status(400).json({
            error: "user name and password must be given"
        });
    }
    if (err.name === "LengthRestrictionUserNameOrPassword") {
        res.status(400).json({
            error: "user name and password must be at least 3 characters long"
        });
    }
    if (err.name === "UniqueUsername") {
        res.status(400).json({
            error: "username must be unique"
        });
    }
    next(err);
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
module.exports = Object.freeze(usersRouter);