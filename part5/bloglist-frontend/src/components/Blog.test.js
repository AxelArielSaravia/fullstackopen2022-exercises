import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/extend-expect";

import Blog from "./Blog.js";

describe("<Blog/>", function() {
    const blog = {
        author: "author",
        likes: 0,
        title: "title",
        url: "url"
    };
    test("display intial content", async function () {
        const {container} = render(<Blog blog={blog}/>);
        const title = await screen.findAllByText("title");
        const author = await screen.findAllByText("author");
        const article = container.querySelector(".table");
        expect(title[0]).toBeDefined();
        expect(author[0]).toBeDefined();
        expect(article).toHaveClass("hidden");
    });
    test("display click content", async function () {
        const user = userEvent.setup();
        const {container} = render(<Blog blog={blog}/>);
        const article = container.querySelector(".table");
        const button = screen.getByText("show");

        expect(article).toHaveClass("hidden");
        await user.click(button);
        expect(article).not.toHaveClass("hidden");
    });

    test("click likes", async function () {
        const mockHandler = jest.fn();
        const user = userEvent.setup();
        render(<Blog blog={blog} handleLikes={mockHandler}/>);

        const button = screen.getByText("Like");
        await user.click(button);
        await user.click(button);
        expect(mockHandler.mock.calls).toHaveLength(2);
    });
});