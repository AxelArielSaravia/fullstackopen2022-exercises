function consoleLog(...params) {
    if (process.env.NODE_ENV !== "test") {
        console.log(...params);
    }
}

function consoleError(...params) {
    if (process.env.NODE_ENV !== "test") {
        console.error(...params);
    }
}

module.exports = Object.freeze({
    consoleError,
    consoleLog
});