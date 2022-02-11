import React, { useState, useContext, Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

import Loader from "../../components/Loader/Loader"
import Label from "../../components/Label/Label"
import H1 from "../../components/Headings/H1"
import { Message } from "../../components/Message/Message"

import styles from "./AuthPage.module.css"

const AuthPage = () => {
	const { onLogin, error, setError, isLoading } = useContext(AuthContext)

	const path = useLocation().pathname.split("/")[1]
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [rememberMe, setRememberMe] = useState(false)

	const clearFields = () => {
		setEmail("")
		setPassword("")
		setUsername("")
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
							onSubmit={(event) =>
								onLogin(event, email, password, rememberMe, clearFields)
							}>
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
								{path === "login" ? "Login" : "Register"}
							</button>
							{
								<div className={styles.authCta}>
									{path === "login" ? (
										<Fragment key="register_cta">
											Not a member?<NavLink to="/register">Register</NavLink>
											here
										</Fragment>
									) : (
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
