import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const logInUser = (event) => {
        const token = localStorage.getItem('jwt-token');
        const opts = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt-token")
            }
        }


        fetch('https://refactored-cod-5wp7qrpv965c6j6-3001.app.github.dev/api/token', opts)
            .then(res => res.json())
            .then(data => {
                if (!data.access_token) {
                    setError("wrong info")
                }
                else {
                    sessionStorage.setItem("jwt-token", data.access_token)
                    navigate("/home")
                    setError("")
                }


            })

    }

    return (
        <div className="text-center mt-5">
            <h1>log-in</h1>
            <h1 style={{display:error? "block": "none"}}>{error}</h1>
            <div>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="email" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={logInUser}>Login</button>
            </div>
        </div>
    );
};
