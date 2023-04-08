const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

async function usersInDb() {
    const blogs = await User.find({});
    return blogs.map((blog) => blog.toJSON());
}


beforeEach(async function () {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    await User.create({username: "root", passwordHash});
});

describe("when there is initially one user in db", function () {
    test("get the only user", async function () {
        const usersAtStart = await usersInDb();

        const res = await api.get("/api/users");
        expect(res.status).toBe(200);
        expect(res.header["content-type"]).toMatch(/application\/json/);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual(usersAtStart[0]);
    });
});

describe("post request succeed", function () {
    test("creation succeeds with a fresh username", async function () {
        const usersAtStart = await usersInDb();

        const newUser = {
            username: "erifab",
            name: "Eric Fabrican",
            password: "cascosa",
        };

        await api.post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", (/application\/json/));

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    });
});

describe("post request fails", function () {
    test("creation fails, no username given", async function () {
        const newUser = {
            name: "Alexia Saravia",
            password: "southweipp",
        };

        const res = (
            await api.post("/api/users").send(newUser)
        );
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("user name and password must be given");
    });

    test("creation fails, no password given", async function () {
        const newUser = {
            name: "Alexia Saravia",
            username: "alexSar",
        };

        const res = (
            await api.post("/api/users").send(newUser)
        );
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("user name and password must be given");
    });
    test("creation fails, no password length is short", async function () {
        const newUser = {
            name: "Alexia Saravia",
            username: "alexSar",
            password: "so",
        };

        const res = (
            await api.post("/api/users").send(newUser)
        );
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("user name and password must be at least 3 characters long");
    });

    test("creation fails, no username length is short", async function () {
        const newUser = {
            name: "root",
            username: "al",
            password: "southweipp",
        };

        const res = (
            await api.post("/api/users").send(newUser)
        );
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("user name and password must be at least 3 characters long");
    });

    test("creation fails, username already exist", async function () {
        const newUser = {
            username: "root",
            password: "sekret",
        };

        const res = (
            await api.post("/api/users").send(newUser)
        );
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("username must be unique");
    });
});

afterAll(function () {
    mongoose.connection.close();
});