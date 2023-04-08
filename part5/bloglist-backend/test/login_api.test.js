const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const User = require("../models/user");

const api = supertest(app);


beforeEach(async function () {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    await User.create({
        passwordHash,
        username: "root"
    });
});

describe("when there is initially one user in db", function () {
    test("succeeds login", async function () {
        const res = await api.post("/api/login").send({
            password: "sekret",
            username: "root"
        });
        expect(res.status).toBe(200);
        expect(res.header["content-type"]).toMatch(/application\/json/);
    });

    test("fail login, username does not exist", async function () {
        const res = await api.post("/api/login").send({
            password: "sekret",
            username: "non existing"
        });
        expect(res.status).toBe(401);
        expect(res.header["content-type"]).toMatch(/application\/json/);
        expect(res.body.error).toBe("Invalid username or password");
    });
    test("fail login, wrong password", async function () {
        const res = await api.post("/api/login").send({
            password: "wrong",
            username: "root"
        });
        expect(res.status).toBe(401);
        expect(res.header["content-type"]).toMatch(/application\/json/);
        expect(res.body.error).toBe("Invalid username or password");
    });
});

afterAll(function () {
    mongoose.connection.close();
});