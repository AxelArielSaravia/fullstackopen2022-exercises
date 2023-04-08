function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomString(length = 6, values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_") {
    if (typeof length !== "number" || length < 1) {
        throw new Error("the first argument must be a positive number");
    }
    if (typeof values !== "string" || values < 2) {
        throw new Error("the second argument must be a string with at less 1 character");
    }
    let str = "";
    for (let i = 0; i < length; i += 1) {
        const indexValue = Math.floor(Math.random() * values.length);
        str += values[indexValue];
    }
    return str;
}

function createRandomListBlog() {
    const listBlog = [];
    const randLength = random(0, 1000);
    let sumOfAllLikes = 0;
    let maxLikes = -1;
    let maxLikesIndex = -1;

    for (let i = 0; i < randLength; i += 1) {
        const likes = random(0, 100);
        sumOfAllLikes += likes;

        if (maxLikes < likes) {
            maxLikes = likes;
            maxLikesIndex = i;
        }

        listBlog[i] = {
            author: randomString(1, "abcde"),
            likes,
            title: randomString()
        };
    }
    return Object.freeze({
        listBlog,
        maxLikesIndex,
        sumOfAllLikes
    });
}

module.exports = Object.freeze({
    createRandomListBlog
});