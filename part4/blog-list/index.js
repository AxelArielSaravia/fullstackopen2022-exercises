/*jslint node*/
const http = require("node:http");

const app = require("./app.js");
const config = require("./utils/config.js");

const server = http.createServer(app);

server.listen(config.PORT, function () {
    console.log(`Server running on port ${config.PORT}`);
});