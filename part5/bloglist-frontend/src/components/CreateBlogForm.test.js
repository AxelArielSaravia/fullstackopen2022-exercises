import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/extend-expect";

import CreateBlogForm from "./CreateBlogForm.js";


describe("<Blog/>", function() {
    const newBlog = {
        author: "author",
        title: "title",
        url: "url"
    };
    test("create new blog", async function () {
        const mockHandler = jest.fn();
        const user = userEvent.setup();
        const {container} = render(<CreateBlogForm handleAddBlog={mockHandler}/>);
        const submit = screen.getByText("Add");
        const authorInput = container.querySelector("input[name=author]");
        const titleInput = container.querySelector("input[name=title]");
        const linkInput = container.querySelector("input[name=link]");
        await user.type(authorInput, newBlog.author);
        await user.type(titleInput, newBlog.title);
        await user.type(linkInput, newBlog.url);
        await user.click(submit);

        console.log(mockHandler.mock.calls);
        expect(mockHandler.mock.calls).toHaveLength(1);
        expect(mockHandler.mock.calls[0][0].title).toBe(newBlog.title);
        expect(mockHandler.mock.calls[0][0].author).toBe(newBlog.author);
        expect(mockHandler.mock.calls[0][0].url).toBe(newBlog.url);
    });
});