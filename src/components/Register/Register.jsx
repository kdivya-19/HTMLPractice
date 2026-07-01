import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [exists, setExists] = useState(false);

    const navigate = useNavigate();

    const userData = {
        name,
        email,
        password
    };

    const addUser = async (event) => {

        event.preventDefault();

        if (email === "" || password === "" || name === "") {
            alert("Please fill all fields.");
            return;
        }

        let user = await fetch("http://localhost:3000/users?email=" + email);
        user = await user.json();

        if (user.length > 0) {
            setExists(true);
            return;
        }

        const res = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            navigate("/");
        }
    };

    return (
        <div className="register-container">

            <form className="register-card">

                <h1>Create Account</h1>
                <p className="subtitle">
                    Join us and start shopping today.
                </p>

                <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={addUser} type="submit">
                    Register
                </button>

                {exists && (
                    <p className="error">
                        User already exists.
                        <Link to="/"> Login Here</Link>
                    </p>
                )}

            </form>

        </div>
    );
}

export default Register;