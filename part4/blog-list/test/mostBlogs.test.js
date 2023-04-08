const {mostBlogs} = require("../utils/list_helper.js");

describe("Most Blogs", function () {
    const listWithOneBlog = [{
        author: "a"
    }];

    const listWith10Blogs = [
        {author: "a"},
        {author: "b"},
        {author: "c"},
        {author: "b"},
        {author: "x"},
        {author: "a"},
        {author: "c"},
        {author: "t"},
        {author: "t"},
        {author: "b"},
    ];
    const listWith7Blogs = [
        {author: "a"},
        {author: "b"},
        {author: "a"},
        {author: "a"},
        {author: "a"},
        {author: "a"},
        {author: "a"},
    ];
    const listWithDifferentAuthors = [
        {author: "a"},
        {author: "b"},
        {author: "c"},
        {author: "d"},
        {author: "e"},
        {author: "f"},
        {author: "g"},
    ];

    test("whith out argument", function () {
        expect(mostBlogs()).toBe(undefined);
    });
    test("when the list is empty", function () {
        expect(mostBlogs([])).toBe(undefined);
    });
    test("when list has only one blog, equals to the only blog", function () {
        const res = {
            author: listWithOneBlog[0].author,
            blogs: 1
        };
        expect(mostBlogs(listWithOneBlog)).toEqual(res);
    });
    test("list has 10 blogs", function () {
        const res = {author: "b", blogs: 3};
        expect(mostBlogs(listWith10Blogs)).toEqual(res);
    });
    test("list has 7 blogs", function () {
        const res = {author: "a", blogs: 6};
        expect(mostBlogs(listWith7Blogs)).toEqual(res);
    });
    test("list has all diferents blog author", function () {
        const res = {author: "a", blogs: 1};
        expect(mostBlogs(listWithDifferentAuthors)).toEqual(res);
    });
});