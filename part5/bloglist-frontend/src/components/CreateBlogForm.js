import {useState, useRef} from "react";

import Togglable from "./Togglable.js";

function CreateNewBlog({handleAddBlog}) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const blogFromRef = useRef();

    function titleChange({target}) {
        setTitle(() => target.value);
    }
    function authorChange({target}) {
        setAuthor(() => target.value);
    }
    function urlChange({target}) {
        setUrl(() => target.value);
    }
    function _handleAddBlog(e) {
        handleAddBlog({
            event: e,
            title,
            author,
            url
        });
        setTitle("");
        setAuthor("");
        setUrl("");
    }
    return (
        <Togglable
            buttonLabel="Create new blog"
            refs={blogFromRef}
        >
            <h3>Create a Blog:</h3>
            <form onSubmit={_handleAddBlog}>
                <table>
                    <tbody>
                        <tr>
                            <td>Title:</td>
                            <td>
                                <input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={titleChange}
                                    required
                                    placeholder="ex: The Humble Programmer"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Author:</td>
                            <td>
                                <input
                                    name="author"
                                    type="text"
                                    value={author}
                                    onChange={authorChange}
                                    placeholder="ex: Edsger W. Dijkstra"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Link:</td>
                            <td>
                                <input
                                    name="link"
                                    type="text"
                                    value={url}
                                    onChange={urlChange}
                                    required
                                    placeholder="ex: https://www.cs.utexas.edu/users/EWD/transcriptions/EWD03xx/EWD340.html"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <button type="submit">Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </Togglable>
    );
}

export default Object.freeze(CreateNewBlog);