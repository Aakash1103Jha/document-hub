import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { BrowserRouter } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
)

reportWebVitals(console.info)
