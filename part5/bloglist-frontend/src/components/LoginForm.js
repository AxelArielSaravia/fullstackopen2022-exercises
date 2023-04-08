import {useState} from "react";

import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

function LoginForm({
    userState,
    setNotification
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password
            });
            console.log("logging in with", username, password);
            console.log("USER", user);
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUsername("");
            setPassword("");
            userState.setUser(user);
        } catch (err) {
            setUsername("");
            setPassword("");
            setNotification(function (s) {
                return {
                    message: "The username or the password is wrong",
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
            <h2>Sign in:</h2>
            <form onSubmit={handleLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    name="login-username"
                                    required
                                    onChange={({target}) => setUsername(target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    name="login-password"
                                    autoComplete="true"
                                    required
                                    onChange={({target}) => setPassword(target.value)}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <button
                                    className="login-submit"
                                    type="submit"
                                >
                                    login
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default Object.freeze(LoginForm);