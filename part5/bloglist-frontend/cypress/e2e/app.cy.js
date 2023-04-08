Cypress.Commands.add("login", function ({username, password}) {
    cy.request("POST", "http://localhost:3001/api/login", {
        username, password
    }).then(function ({body}) {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
        cy.visit("http://localhost:3000");
    });
});

Cypress.Commands.add("createNote", function (body) {
    cy.request({
        url: "http://localhost:3001/api/blogs",
        method: "POST",
        body,
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`
        }
    });
    cy.visit("http://localhost:3000");
});

const user = {
    name: "Eric",
    username: "ericfab",
    password: "mysuperpass"
};

describe("Blog app", function() {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/reset");
        cy.request("POST", "http://localhost:3001/api/users/", user);
        cy.visit("http://localhost:3000");
    });
    it("Login form is shown", function() {
        cy.contains("Blog App");
        cy.contains("Sign in:");
    });

    describe("Login",function() {
        it("succeeds with correct credentials", function () {
            cy.get("input[name=login-username]").type(user.username);
            cy.get("input[name=login-password]").type(user.password);
            cy.get(".login-submit").click();
            cy.contains(`Welcome ${user.name}`);
        });

        it("fails with wrong credentials", function () {
            cy.get("input[name=login-username]").type(user.username);
            cy.get("input[name=login-password]").type("wrongpassword");
            cy.get(".login-submit").click();
            cy.get(".notification")
            .should("contain", "The username or the password is wrong")
            .should("have.css", "color", "rgb(255, 0, 0)");
        });
    });
});

describe("When logged in", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/reset");
        cy.request("POST", "http://localhost:3001/api/users/", user);
        cy.login({username: user.username, password: user.password});
    });

    it("A blog can be created", function () {
        cy.contains("Create new blog").click();
        cy.get("input[name=title]").type("A title");
        cy.get("input[name=author]").type("unknown");
        cy.get("input[name=link]").type("tplink");
        cy.contains("Add").click();
        cy.contains("A title");
    });

    describe("change a blog", function() {
        beforeEach(function () {
            cy.createNote({
                title: "Other title",
                author: "uknown",
                url: "newLink"
            });
        });
        it("add a like", function () {
            cy.contains("show").click();
            cy.get(".like-button").click();
            cy.get(".like-text")
            .should("contain", "1");
        });
        it("delete blog", function () {
            cy.contains("show").click();
            cy.contains("remove").click();
            cy.get("#root").should("not.contain", "Other title");
        });
    });

    describe("multiple blogs in order", function () {
        beforeEach(function () {
            cy.createNote({
                title: "Title1",
                author: "uknown",
                url: "newLink",
                likes:1
            });
            cy.createNote({
                title: "Title2",
                author: "uknown",
                url: "newLink",
                likes: 2
            });
            cy.createNote({
                title: "Title3",
                author: "uknown",
                url: "newLink",
                likes: 3
            });
        });
        it("in order", function () {
            cy.get(".blog").eq(0).should("contain", "Title3");
            cy.get(".blog").eq(1).should("contain", "Title2");
            cy.get(".blog").eq(2).should("contain", "Title1");
        });
    });
});