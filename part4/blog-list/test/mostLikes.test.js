const {mostLikes} = require("../utils/list_helper.js");

describe("Most Likes", function () {
    const listWithOneBlog = [{
        author: "a",
        likes: 1
    }];

    const listWithTheSameLikes = [
        {author: "a", likes: 1},
        {author: "b", likes: 1},
        {author: "c", likes: 1},
        {author: "d", likes: 1},
        {author: "e", likes: 1},
        {author: "f", likes: 1},
        {author: "g", likes: 1},
    ];

    const listWith7blogs1 = [
        {author: "a", likes: 2},
        {author: "b", likes: 8},
        {author: "c", likes: 4},
        {author: "d", likes: 2},
        {author: "e", likes: 1},
        {author: "f", likes: 2},
        {author: "g", likes: 7},
    ];

    const listWith7blogs2 = [
        {author: "a", likes: 2},
        {author: "b", likes: 8},
        {author: "c", likes: 4},
        {author: "a", likes: 2},
        {author: "e", likes: 1},
        {author: "a", likes: 2},
        {author: "c", likes: 7},
    ];
    test("whith out argument", function () {
        expect(mostLikes()).toBe(undefined);
    });
    test("when the list is empty", function () {
        expect(mostLikes([])).toBe(undefined);
    });
    test("when list has only one blog, equals that blog", function () {
        expect(mostLikes(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    });
    test("when list has the same likes in all blogs", function () {
        const res = {author: "a", likes: 1};
        expect(mostLikes(listWithTheSameLikes)).toEqual(res);
    });
    test("list has 7 blogs v1", function () {
        const res = {author: "b", likes: 8};
        expect(mostLikes(listWith7blogs1)).toEqual(res);
    });
    test("list has 7 blogs v2", function () {
        const res = {author: "c", likes: 11};
        expect(mostLikes(listWith7blogs2)).toEqual(res);
    });
});