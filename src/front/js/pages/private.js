import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
    const {email, setEmail} = useState;
    const {password, setPassword} = useState;

	return (
		<div className="text-center mt-5">
			<h1>log-in</h1>
			<div>
                <input type = "email" placeholder="email" value= {email} onChange={(e) => setEmail(e.target.value)}/>
                <input type = "email" placeholder="password" value= {password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </div>
		</div>
	);
};