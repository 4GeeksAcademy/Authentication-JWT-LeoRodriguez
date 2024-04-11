import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("This is your token", store.token);

    const handleClick = () =>{
        actions.login(email, password);
    };
    
    const navigate = useNavigate();

    if(store.token && store.token != "" && store.token!= undefined) {
        navigate('/home');
        return true; // Indica que se redirigió exitosamente
    }
    
    return(
        <div className="text-center mt-5">
            <h1>Sign Up</h1>
            
                {(store.token && store.token!="0" && store.token!=undefined) ? "You are logged in with" + token :
                <div>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleClick}>Sign Up</button>
            </div>
            }
            
        </div>
    );
};