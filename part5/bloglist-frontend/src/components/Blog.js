import {useState} from "react";

const blogStyle = {
    padding: "5px",
    margin: "2px",
    border: "1px solid #000"
};
const paddingRight = {paddingRight: "10px"};
const padding = {padding: "5px 0"};

function Blog({blog, handleLikes, handleRemove}) {
    const [visible, setVisible] = useState(false);
    if (blog === undefined) {
        return;
    }

    const buttonLable = (
        visible
        ? "hidde"
        : "show"
    );
    const tableClass = (
        visible
        ? "table"
        : "table hidden"
    );
    function toggleVisible() {
        setVisible((s) => !s);
    }

    return (
        <div style={blogStyle} className="blog">
            <div>
                <strong style={paddingRight}>{blog.title}</strong>
            </div>
            <div>
                <span style={paddingRight}>{blog.author}</span>
                <button
                    type="button"
                    onClick={toggleVisible}
                >
                    {buttonLable}
                </button>
            </div>
            <article className={tableClass} style={{paddingTop: "5px"}}>
                <div style={padding}>
                    <span style={paddingRight}>Title:</span>
                    <span>{blog.title}</span>
                </div>
                <div style={padding}>
                    <span style={paddingRight}>Author:</span>
                    <span>{blog.author}</span>
                </div>
                <div style={padding}>
                    <span style={paddingRight}>Link:</span>
                    <a href={blog.url} rel="noopener noreferrer" targe="_blank">
                        {blog.url}
                    </a>
                </div>
                <div style={padding}>
                    <span style={paddingRight}>Likes:</span>
                    <span
                        className="like-text"
                        style={paddingRight}
                    >{blog.likes}</span>
                    <button
                        className="like-button"
                        type="button"
                        onClick={() => handleLikes(blog)}
                    >
                        Like
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => handleRemove(blog)}
                    >
                        remove
                    </button>
                </div>
            </article>
        </div>
    );
}

export default Blog;