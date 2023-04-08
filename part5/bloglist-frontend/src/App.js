import {useState, useEffect} from "react";

import blogService from "./services/blogs.js";

import Blog from "./components/Blog.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import Notification from "./components/Notification.js";
import CreateNewBlog from "./components/CreateBlogForm.js";


function sortBlogs(a, b) {
    if (a.likes > b.likes) {
        return -1;
    }
    if (a.likes < b.likes) {
        return 1;
    }
    return 0;
}

function UserBlogs({setNotification}) {
    const [blogs, setBlogs] = useState([]);
    Array.prototype.sort.call(blogs, sortBlogs);

    useEffect(function () {
        console.log("BLOGS", blogs);
    }, [blogs]);

    useEffect(function () {
        (async function () {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        }());
    }, []);

    async function handleLikes(blog) {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        };
        try {
            const res = await blogService.update(blog.id, updatedBlog);
            setBlogs(function (s) {
                const newBlogs = s.filter((el) => el.id !== blog.id);
                newBlogs.push(res);
                return newBlogs;
            });
        } catch(err) {
            console.error(err);
        }
    }

    async function handleRemove(blog) {
        try {
            if (window.confirm(`Remove blog: ${blog.title}`)) {
                await blogService.remove(blog.id);
                setBlogs(function (s) {
                    return s.filter((el) => el.id !== blog.id);
                });
                setNotification(function (s) {
                    return {
                        ...s,
                        message: `You remove ${blog.title} successfully`,
                        isSucceed: true,
                    };
                });
            }
        } catch(err) {
            setNotification(function (s) {
                return {
                    ...s,
                    message: "Error occurr: we can not remove the blog",
                    isError: true,
                };
            });
            console.error(err);
        }
        setTimeout(function () {
            setNotification(function (s) {
                return {
                    message: "",
                    isError: false,
                    isSucceed: false
                };
            });
        }, 3000);
    }

    async function handleAddBlog({event, title, author, url}) {
        event.preventDefault();
        if (title === "" || author === "" || url === "") {
            console.warn("No Empty inputs");
            return;
        }
        const newBlog = {author, title, url};
        try {
            const data = await blogService.create(newBlog);
            console.log("add blog data:", data);
            if (data) {
                setBlogs((s) => [...s, data]);
                setNotification(function (s) {
                    return {
                        ...s,
                        message: `A new blog ${title} by ${author}`,
                        isSucceed: true,
                    };
                });
            }
        } catch (err) {
            console.error(err);
            setNotification(function (s) {
                return {
                    ...s,
                    message: `A new blog ${title} by ${author}`,
                    isError: true
                };
            });
        }
        setTimeout(function () {
            setNotification(function (s) {
                return {
                    message: "",
                    isError: false,
                    isSucceed: false
                };
            });
        }, 3000);
    }

    return (
        <>
            <CreateNewBlog
                handleAddBlog={handleAddBlog}
                setNotification={setNotification}
            />
            <h3>My Blogs:</h3>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    setNotification={setNotification}
                    handleLikes={handleLikes}
                    handleRemove={handleRemove}
                    blog={blog}
                />
            ))}
        </>
    );
}

function UseContainer({setNotification, userState}) {
    const {user, setUser} = userState;

    function logout() {
        blogService.setToken("");
        localStorage.removeItem("loggedBlogappUser");
        setUser(() => null);
    }

    if (user === null) {
        return (
            <LoginForm
                userState={userState}
                setNotification={setNotification}
            />
        );
    }
    return (
        <>
            <h2>Welcome {user.name}</h2>
            <button
                type="button"
                onClick={logout}
            >
                logout
            </button>
            <hr/>
            <UserBlogs
                setNotification={setNotification}
            />
        </>
    );
}


function App() {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({
        message: "",
        isError: false,
        isSucceed: false
    });

    useEffect(function () {
        try {
            const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
            if (loggedUserJSON !== null) {
                const user = JSON.parse(loggedUserJSON);
                setUser(user);
                blogService.setToken(user.token);
            }
        } catch (err) {
            console.warn(err);
        }
    }, []);


    return (
        <>
            <h1>Blog App</h1>
            <Notification {...notification} />
            <UseContainer
                setNotification={setNotification}
                userState={{user, setUser}}
            />
            {user === null && (
                <RegisterForm
                    setNotification={setNotification}
                />
            )}
        </>
    );
}

export default Object.freeze(App);