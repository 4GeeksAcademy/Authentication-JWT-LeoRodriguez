import React, { useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="ml-auto">
					<Link to="/signup">
						<button className="navbar-brand mb-0 h1">signup</button>
					</Link>
				</div>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/login">
							<button className="navbar-brand mb-0 h1">Login</button>
						</Link> 
						:
							<button onClick={() => actions.logout()} className="navbar-brand mb-0 h1">Log out</button>
						
					}
					
				</div>
			</div>
		</nav>
	);
};
