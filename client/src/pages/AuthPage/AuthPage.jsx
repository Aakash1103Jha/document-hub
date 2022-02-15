import React, { useState, useContext, Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

import Loader from "../../components/Loader/Loader"
import Label from "../../components/Label/Label"
import H1 from "../../components/Headings/H1"
import { Message } from "../../components/Message/Message"

import styles from "./AuthPage.module.css"

const AuthPage = () => {
	const { onLogin, error, setError, isLoading, onRegister, onResetPassword } =
		useContext(AuthContext)

	const path = useLocation().pathname.split("/")[1]
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confPassword, setConfPassword] = useState("")
	const [rememberMe, setRememberMe] = useState(false)

	const clearFields = () => {
		setEmail("")
		setPassword("")
		setUsername("")
	}
	const onSubmitHandler = (event, path) => {
		switch (path) {
			case "login":
				onLogin(event, email, password, rememberMe, clearFields)
				break
			case "register":
				if (password.trim() !== confPassword.trim()) return alert("Password does not match")
				onRegister(event, username, email, password, clearFields)
				break
			case "reset-password":
				if (password.trim() !== confPassword.trim()) {
					return alert("Password does not match")
				}
				onResetPassword(event, email, password, clearFields)
				break

			default:
				break
		}
	}
	return (
		<div className={styles.authpage}>
			{isLoading === false ? (
				<>
					<header className={styles.header}>
						<H1 key="authPage" text={path.toUpperCase()} />
					</header>
					<div className={styles.authForm}>
						<form
							className={styles.form}
							onSubmit={(event) => onSubmitHandler(event, path)}>
							<Label label="Email" id="email" isMandatory={true} />
							<input
								className={
									error.length !== 0
										? styles.input + " " + styles.error
										: styles.input
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
								<Fragment key="username_">
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
								</Fragment>
							)}
							<Label label="Password" id="password" type="info" isMandatory={true} />
							<input
								className={
									error.length !== 0
										? styles.input + " " + styles.error
										: styles.input
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
							{(path === "register" || path === "reset-password") && (
								<Fragment>
									<Label
										label="Confirm Password"
										id="confPassword"
										type="info"
										isMandatory={true}
									/>
									<input
										className={
											error.length !== 0
												? styles.input + " " + styles.error
												: styles.input
										}
										type="password"
										placeholder="Re-enter your password"
										id="ConfPassword"
										required
										value={confPassword}
										onChange={(event) => {
											setError("")
											setConfPassword(event.target.value)
										}}
									/>
								</Fragment>
							)}
							{path === "login" && (
								<div className={styles.rememberme} key="remember_me_cta">
									<input
										type="checkbox"
										value={rememberMe}
										onClick={() => setRememberMe(!rememberMe)}
									/>
									Remember Me
								</div>
							)}

							<Message message={error} type="error" />
							<button className={styles.authBtn}>
								{path === "login" && "Login"}
								{path === "register" && "Register"}
								{path === "reset-password" && "Reset Password"}
							</button>
							{
								<div className={styles.authCta}>
									{path === "login" && (
										<Fragment key="register_cta">
											Not a member?<NavLink to="/register">Register</NavLink>
											here
											<br />
											<br />
											Forgot password?{" "}
											<NavLink to="/reset-password">Reset</NavLink>here
										</Fragment>
									)}
									{path === "register" && (
										<Fragment key="login_cta">
											Already a member?<NavLink to="/login">Login</NavLink>
											here
										</Fragment>
									)}
								</div>
							}
						</form>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default AuthPage
