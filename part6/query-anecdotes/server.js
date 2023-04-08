const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

function validator(request, response, next) {
    console.log();
    if (request.method === "POST") {
        const content = request?.body?.content;
        if (content.length < 5) {
            return response.status(400).jsonp({
                error: "too short anecdote, must have length 5 or more"
            });
        }
    }
    next();
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, function () {
    console.log("JSON Server is running");
    console.log("Port: http://localhost:3001/db");
});