import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import Label from "../../components/Label/Label"

import styles from "./AuthPage.module.css"

const AuthPage = () => {
	const path = useLocation().pathname.split("/")[1]
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	return (
		<div className={styles.authpage}>
			<header className={styles.header}>
				<h1>{path.toUpperCase()}</h1>
			</header>
			<div className={styles.authForm}>
				<form className={styles.form}>
					<Label label="Email" id="email" isMandatory={true} />
					<input
						type="email"
						placeholder="janedoe@example.com"
						id="email"
						value={email}
						required
						onChange={(event) => setEmail(event.target.value)}
					/>
					{path === "register" && (
						<>
							<Label label="Username" id="username" isMandatory={true} />
							<input
								type="text"
								placeholder="myawesomeusername"
								id="username"
								required
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</>
					)}
					<Label label="Password" id="password" type="info" isMandatory={true} />
					<input
						type="password"
						placeholder="Janedoe@123"
						id="password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button className={styles.authBtn} type="button">
						{path === "login" ? "Login" : "Register"}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
