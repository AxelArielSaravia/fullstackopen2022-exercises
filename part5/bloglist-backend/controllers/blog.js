const jsonWebToken = require("jsonwebtoken");
const {Router} = require("express");

const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const {tokenExtractor} = require("../utils/middleware.js");

const blogsRouter = Router();

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
blogsRouter.use(tokenExtractor);

blogsRouter.get("/", async function (req, res, next) {
    try {
        const decodedToken = jsonWebToken.verify(req.token, process.env.SECRET);
        console.log("DECODED TOKEN",decodedToken);
        if (decodedToken.id === undefined) {
            throw {name: "TokenIdMissing"};
        }
        const user = (
            await User.findById(decodedToken.id).populate("blogs", {
                author: 1,
                title: 1,
                likes: 1,
                url: 1
            })
        );
        if (user === null) {
            throw {name: "NoUserFound"};
        }
        console.log("USER BLOGS", user.blogs);
        res.json(user.blogs);
    } catch (err) {
        next(err);
    }
});

blogsRouter.post("/", async function (req, res, next) {
    const body = req.body;
    try {
        if (body === undefined || body === null) {
            throw {name: "EmptyBody"};
        }

        const decodedToken = jsonWebToken.verify(req.token, process.env.SECRET);

        if (decodedToken.id === undefined) {
            throw {name: "TokenIdMissing"};
        }

        const user = await User.findById(decodedToken.id);

        if (user === null) {
            throw {name: "NoUserFound"};
        }

        const newBlog = {
            author: (
                (typeof body.author === "string" && body.author.length > 0)
                ? body.author
                : "unknown"
            ),
            likes: (
                (typeof body.likes === "number")
                ? body.likes
                : 0
            ),
            title: body.title,
            url: body.url,
            user: user._id
        };
        const savedBlog = await Blog.create(newBlog);

        user.blogs = Array.prototype.concat(user.blogs, savedBlog._id);
        await user.save();

        res.status(201).json(savedBlog);
    } catch (err) {
        next(err);
    }
});

blogsRouter.put("/:id", async function (req, res, next) {
    const body = req.body;

    try {
        if (body === undefined || body === null) {
            throw {name: "EmptyBody"};
        }
        const decodedToken = jsonWebToken.verify(req.token, process.env.SECRET);
        const blog = await Blog.findById(req.params.id);

        if (blog === null) {
            throw {name: "NoBlogFound"};
        }

        if (blog.user.toString() !== decodedToken.id.toString()) {
            throw {name: "JsonWebTokenError"};
        }

        blog.author = (
            typeof body.author === "string" && body.author.length > 0
            ? body.author
            : blog.author
        );
        blog.likes = (
            typeof body.likes === "number" && body.likes >= 0
            ? body.likes
            : blog.likes
        );
        blog.title = (
            typeof body.title === "string" && body.title.length > 0
            ? body.title
            : blog.title
        );
        blog.url = (
            typeof body.url === "string" && body.url.length > 0
            ? body.url
            : blog.url
        );
        const updatedBlog = await blog.save();
        res.json(updatedBlog);

    } catch (err) {
        next(err);
    }
});

blogsRouter.delete("/:id", async function (req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog === null) {
            throw {name: "NoBlogFound"};
        }

        const decodedToken = jsonWebToken.verify(req.token, process.env.SECRET);

        if (decodedToken.id === undefined) {
            throw {name: "TokenIdMissing"};
        }
        if (blog.user.toString() !== decodedToken.id.toString()) {
            throw {name: "JsonWebTokenError"};
        }

        await blog.remove();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

/* -------------------------------------------------------------------------- */
/*                                ERROR HANDLER                               */
/* -------------------------------------------------------------------------- */
blogsRouter.use(function (err, req, res, next) {
    if (err.name === "EmptyBody") {
        res.status(400).json({
            error: "the request send an empty body"
        });
    }
    if (err.name === "TokenIdMissing") {
        res.status(401).json({
            error: "token missing or invalid"
        });
    }
    if (err.name === "NoBlogFound") {
        res.status(404).json({
            error: "no blogs found"
        });
    }
    if (err.name === "NoUserFound") {
        res.status(404).json({
            error: "no user found"
        });
    }

    next(err);
});

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
module.exports = blogsRouter;