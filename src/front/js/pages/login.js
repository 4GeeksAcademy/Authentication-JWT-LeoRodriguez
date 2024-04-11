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
        actions.login(email, password);
    };
    

    if(store.token && store.token != "" && store.token!= undefined) {
        navigate('/');
        return true; // Indica que se redirigió exitosamente
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
