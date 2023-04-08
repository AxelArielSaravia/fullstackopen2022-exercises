const {favoriteBlog} = require("../utils/list_helper.js");
const {createRandomListBlog} = require("./utils.js");


describe("favorite blogs", function () {
    const listWithOneBlog = [{
        author: "a",
        likes: 2,
        title: "a"
    }];

    const listWithSameLikes = [
        {
            author: "a",
            likes: 2,
            title: "a"
        }, {
            author: "b",
            likes: 2,
            title: "b"
        }, {
            author: "c",
            likes: 2,
            title: "c"
        },
    ];
    test("whith out argument", function () {
        expect(favoriteBlog()).toBe(undefined);
    });
    test("when the list is empty", function () {
        expect(favoriteBlog([])).toBe(undefined);
    });
    test("when list has only one blog, equals to the only blog", function () {
        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    });
    test("when list have blogs with the same likes values", function () {
        const res = {
            author: "a",
            likes: 2,
            title: "a"
        };
        expect(favoriteBlog(listWithSameLikes)).toEqual(res);
    });
    test("random list 1", function () {
        const {listBlog, maxLikesIndex} = createRandomListBlog();
        expect(favoriteBlog(listBlog)).toEqual(listBlog[maxLikesIndex]);
    });
    test("random list 2", function () {
        const {listBlog, maxLikesIndex} = createRandomListBlog();
        expect(favoriteBlog(listBlog)).toEqual(listBlog[maxLikesIndex]);
    });
    test("random list 3", function () {
        const {listBlog, maxLikesIndex} = createRandomListBlog();
        expect(favoriteBlog(listBlog)).toEqual(listBlog[maxLikesIndex]);
    });
});