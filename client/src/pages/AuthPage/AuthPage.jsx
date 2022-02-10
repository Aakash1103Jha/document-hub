import React, { useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

import Label from "../../components/Label/Label"
import { Message } from "../../components/Message/Message"

import styles from "./AuthPage.module.css"

const AuthPage = () => {
	const { onLogin, error, setError } = useContext(AuthContext)

	const path = useLocation().pathname.split("/")[1]
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const clearFields = () => {
		setEmail("")
		setPassword("")
		setUsername("")
	}

	return (
		<div className={styles.authpage}>
			<header className={styles.header}>
				<h1>{path.toUpperCase()}</h1>
			</header>
			<div className={styles.authForm}>
				<form
					className={styles.form}
					onSubmit={(event) => onLogin(event, email, password, clearFields)}>
					<Label label="Email" id="email" isMandatory={true} />
					<input
						className={
							error.length !== 0 ? styles.input + " " + styles.error : styles.input
						}
						type="email"
						placeholder="janedoe@example.com"
						id="email"
						value={email}
						required
						onChange={(event) => {
							setError("")
							setEmail(event.target.value)
						}}
					/>
					{path === "register" && (
						<>
							<Label label="Username" id="username" isMandatory={true} />
							<input
								className={
									error.length !== 0
										? styles.input + " " + styles.error
										: styles.input
								}
								type="text"
								placeholder="myawesomeusername"
								id="username"
								required
								value={username}
								onChange={(event) => {
									setError("")
									setUsername(event.target.value)
								}}
							/>
						</>
					)}
					<Label label="Password" id="password" type="info" isMandatory={true} />
					<input
						className={
							error.length !== 0 ? styles.input + " " + styles.error : styles.input
						}
						type="password"
						placeholder="Janedoe@123"
						id="password"
						required
						value={password}
						onChange={(event) => {
							setError("")
							setPassword(event.target.value)
						}}
					/>
					<Message message={error} type="error" />
					<button className={styles.authBtn}>
						{path === "login" ? "Login" : "Register"}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
