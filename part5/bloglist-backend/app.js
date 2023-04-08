const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blog.js");
const usersRouter = require("./controllers/user.js");
const loginRouter = require("./controllers/login.js");

const config = require("./utils/config.js");
const {
    requestLogger,
    unknownEndpoint,
    errorHandler
} = require("./utils/middleware.js");
const {
    consoleError,
    consoleLog
} = require("./utils/console.js");

const app = express();

/* -------------------------------------------------------------------------- */
/*                               CONNECT THE DB                               */
/* -------------------------------------------------------------------------- */
mongoose.connect(config.MONGODB_URI).then(function () {
    consoleLog("connected to MongoDB");
}).catch(function (error) {
    consoleError("error connecting to MongoDB:", error.message);
});

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARES                                */
/* -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
    const resetRouter = require("./controllers/reset");
    app.use("/api/reset", resetRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
module.exports = Object.freeze(app);