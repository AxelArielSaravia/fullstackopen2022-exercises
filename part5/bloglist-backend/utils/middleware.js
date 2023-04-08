const {
    consoleError,
    consoleLog
} = require("./console.js");

function requestLogger(req, res, next) {
    consoleLog("Path:  ", req.path);
    consoleLog("Method:", req.method);
    consoleLog("Body:  ", req.body);
    consoleLog("---");
    next();
}

// If exist an autorization type bearer in the request body
// define a token property in the request object
function tokenExtractor(req, res, next) {
    const authorization = req.get("authorization");
    if (authorization !== undefined
        && authorization.toLowerCase().startsWith("bearer ")
    ) {
        req.token = authorization.substring(7);
    }
    next();
}

//When the route is unknown
function unknownEndpoint(req, res) {
    res.status(404).send({error: "unknown endpoint"});
}

//Globlal error handler
function errorHandler(err, req, res, next) {
    consoleError(err.name);
    consoleError(err.message);
    consoleError("---");

    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: err.message
        });
    } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            error: "invalid token"
        });
    } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            error: "token expired"
        });
    }
    next(err);
}

module.exports = Object.freeze({
    errorHandler,
    requestLogger,
    tokenExtractor,
    unknownEndpoint
});