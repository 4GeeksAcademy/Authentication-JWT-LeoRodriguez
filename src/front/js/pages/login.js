import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const { email, setEmail} = useState("");
    const { password, setPassword} = useState("");

    const handleClick = () =>{

    fetch(process.env.BACKEND_URL + "api/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
      .then(resp => {
        // Handle response
        if (resp.status === 200) return resp.json();
            else alert("There has been an error.")
      })
      .catch(error => {
        // Handle error
        console.log("There was an error", error)
      });
    }



	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Log In</button>
            </div>
		</div>
	);
};
