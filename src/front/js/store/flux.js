const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application is loaded synching the session storage token.")
				if (token && token != "" && token!= undefined ) setStore({ token: token});
			},
			login: async (email, password) =>{
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				try{
					const resp = await fetch('https://automatic-halibut-9r9wwvqrvwx2x6r-3001.app.github.dev/api/token', opts)
					if(resp.status !== 200){
					alert("There has been an error.");
					return false
				}
				
				const data = await resp.json();
				console.log("this came from the backend", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token})
				return true
				}
			catch(error){
				console.log("there has been an error", error)
			}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login Out");
				setStore({token: null});
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
