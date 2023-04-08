const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const initialBlogs = [
    {
        "author": "Jeremy Wagner",
        "likes": 24,
        "title": "Now THAT'S What I Call Service Worker!",
        "url": "https://alistapart.com/article/now-thats-what-i-call-service-worker/"
    },{
        "author": "Lennart Overkamp",
        "likes": 29,
        "title": "Designers, (Re)define Success First",
        "url": "https://alistapart.com/article/redefine-success-first/"
    }
];

async function blogsInDb() {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
}



describe("exist blogs in db", function () {
    beforeEach(async function () {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });
    test("returned a json format", async function () {
        await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", (/application\/json/));
    });

    test("all blogs are returned", async function () {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(initialBlogs.length);
    });
});

describe("viewing a specific property in a blog", function () {
    beforeEach(async function () {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });
    test("blogs have ids", async function () {
        const response = await api.get("/api/blogs");
        const idAray = response.body.map((blog) => blog.id);
        expect(idAray).not.toContain(undefined);
    });
});

describe("addition of a new blog", function () {
    beforeEach(async function () {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = await User.create({
            passwordHash,
            username: "root"
        });
        const blogs = initialBlogs.map(function (b) {
            b.user = user._id;
            return b;
        });
        await Blog.insertMany(blogs);
    });

    test("create blog succeed", async function () {

        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );
        const newBlog = {
            author: "Brad Frost",
            likes: 17,
            title: "Atomic Design",
            url: "https://bradfrost.com/blog/post/atomic-web-design/"
        };

        await api
        .post("/api/blogs")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

        const allBlogs = await blogsInDb();
        expect(allBlogs).toHaveLength(initialBlogs.length + 1);
    });
    test("create a default like when is missing", async function () {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );

        const newBlog = {
            author: "Best Author",
            title: "new Blog",
            url: "localhost:3001/"
        };

        await api.post("/api/blogs")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(newBlog);

        const [specific_blog] = await Blog.find({title: "new Blog"});
        expect(specific_blog.likes).toBe(0);
    });

    test("create blog fails, missing title", async function () {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );
        const newBlog = {
            author: "C",
            url: "localhost:3002/"
        };
        await api.post("/api/blogs")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(newBlog)
        .expect(400);
    });

    test("create blog fails, missing url", async function () {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );
        const newBlog = {
            author: "G",
            title: "aasdkier",
        };
        await api.post("/api/blogs")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(newBlog)
        .expect(400);
    });

    test("create blog fails, bad token", async function () {
        const newBlog = {
            author: "Brad Frost",
            likes: 17,
            title: "Atomic Design",
            url: "https://bradfrost.com/blog/post/atomic-web-design/"
        };

        const res = (
            await api.post("/api/blogs")
            .send(newBlog)
        );
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("invalid token");
    });
});

describe("updating of a blog", function () {
    beforeEach(async function () {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = await User.create({
            passwordHash,
            username: "root"
        });
        const blogs = initialBlogs.map(function (b) {
            b.user = user._id;
            return b;
        });
        await Blog.insertMany(blogs);
    });

    test("update blog succeed", async function() {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );

        const [firstBlog] = await blogsInDb();

        const updateBlog = {
            likes: 234
        };
        await api.put(`/api/blogs/${firstBlog.id}`)
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(updateBlog)
        .expect(200);

        const [updatedFirstBlog] = await blogsInDb();
        expect(updatedFirstBlog.likes).toBe(234);
    });

    test("update blog fails, no blog found", async function() {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );
        const updateBlog = {
            likes: 234
        };

        await api.put("/api/blogs/44324f432ae3")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .send(updateBlog)
        .expect(404);
    });

    test("update blog fails, invalid token", async function() {
        const updateBlog = {
            likes: 234
        };

        await api.put("/api/blogs/44324f432ae3")
        .send(updateBlog)
        .expect(401);
    });
});

describe("deletion of a blog", function () {
    beforeEach(async function () {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = await User.create({
            passwordHash,
            username: "root"
        });
        const blogs = initialBlogs.map(function (b) {
            b.user = user._id;
            return b;
        });
        await Blog.insertMany(blogs);
    });

    test("delete blog succeed", async function() {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );

        const [firstBlog] = await blogsInDb();

        await api.delete(`/api/blogs/${firstBlog.id}`)
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .expect(204);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

        const titles = blogsAtEnd.map((r) => r.title);
        expect(titles).not.toContain(firstBlog.title);
    });

    test("delete blog fails, no blog found", async function() {
        const logginRes = (  // Loggin the root user
            await api.post("/api/login")
            .send({
                password: "sekret",
                username: "root"
            })
        );

        await api.delete("/api/blogs/44324f432ae3")
        .set("Authorization", `bearer ${logginRes.body.token}`)
        .expect(404);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    });

    test("delete blog fails, invalid token", async function() {
        const [firstBlog] = await blogsInDb();

        await api.delete(`/api/blogs/${firstBlog.id}`)
        .expect(401);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    });
});

afterAll(function () {
    mongoose.connection.close();
});