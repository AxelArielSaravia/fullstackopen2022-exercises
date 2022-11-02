const {Router} = require("express");

const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const resetRouter = Router();

resetRouter.post("/", async function (req, res) {
    await Blog.deleteMany({});
    await User.deleteMany({});

    res.status(204).end();
});

module.exports = Object.freeze(resetRouter);