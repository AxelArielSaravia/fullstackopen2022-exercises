import {useState} from "react";

import registerService from "../services/register.js";

function RegisterForm({
    setNotification
}) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(event) {
        event.preventDefault();
        try {
            await registerService.create({
                username,
                name,
                password
            });

            setUsername("");
            setPassword("");
            setName("");
        } catch (err) {
            setUsername("");
            setPassword("");
            setName("");
            setNotification(function (s) {
                return {
                    message: "Something was wrong",
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
            <h2>Sign up:</h2>
            <form onSubmit={handleRegister}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    name="register-username"
                                    required
                                    onChange={({target}) => setUsername(target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    value={name}
                                    name="register-name"
                                    required
                                    onChange={({target}) => setName(target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    name="register-password"
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
                                    className="register-submit"
                                    type="submit"
                                >
                                    register
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default Object.freeze(RegisterForm);