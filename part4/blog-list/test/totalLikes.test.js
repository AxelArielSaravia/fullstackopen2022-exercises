const {totalLikes} = require("../utils/list_helper.js");
const {createRandomListBlog} = require("./utils.js");

describe("total likes", function () {
    const emptyListBlog = [];
    const listWithOneBlog = [{
        _id: "5a422aa71b54a676234d17f8",
        author: "Edsger W. Dijkstra",
        likes: 5,
        title: "Go To Statement Considered Harmful",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
    }];

    const listWithThreeBlog = [
        {likes: 5},
        {likes: 24},
        {likes: 1}
    ];

    test("when the function is call with out arguments", function () {
        expect(totalLikes()).toBe(0);
    });
    test("when list is empty, equals to 0", function () {
        expect(totalLikes(emptyListBlog)).toBe(0);
    });
    test("when list has only one blog, equals the likes of that", function () {
        expect(totalLikes(listWithOneBlog)).toBe(5);
    });
    test("when list has three blogs, equals the sum of all", function () {
        expect(totalLikes(listWithThreeBlog)).toBe(30);
    });
    test("random list 1", function () {
        const {listBlog, sumOfAllLikes} = createRandomListBlog();
        expect(totalLikes(listBlog)).toBe(sumOfAllLikes);
    });
    test("random list 2", function () {
        const {listBlog, sumOfAllLikes} = createRandomListBlog();
        expect(totalLikes(listBlog)).toBe(sumOfAllLikes);
    });
    test("random list 3", function () {
        const {listBlog, sumOfAllLikes} = createRandomListBlog();
        expect(totalLikes(listBlog)).toBe(sumOfAllLikes);
    });
});