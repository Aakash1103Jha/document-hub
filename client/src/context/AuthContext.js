import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import propTypes from "prop-types"

import { validatePassword } from "../validations/validations"

export const AuthContext = createContext({
	isLoggedIn: false,
	error: "",
	setError: () => {},
	onLogin: (event, email, password, rememberMe, clearFields) => {},
	onResetPassword: (event, email, password, clearFields) => {},
	onRegister: (event, username, email, password, clearFields) => {},
	onLogout: () => {},
	isLoading: false,
	checkRememberMe: () => {},
})

const AuthContextProvider = ({ children, ...rest }) => {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const flag = localStorage.getItem("rememberMe")

	const onLogin = async (event, email, password, rememberMe, clearFields) => {
		event.preventDefault()
		if (!email || !password) return setError("Mandatory fields missing")
		setIsLoading(true)
		try {
			const res = await fetch("/auth/login", {
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			})
			setIsLoading(false)
			const { status } = res
			if (status !== 200) return setError(await res.json())
			clearFields()
			localStorage.setItem("rememberMe", rememberMe)
			setIsLoggedIn(true)
			return navigate("/")
		} catch (err) {
			console.error(err.message)
			return setError("Either email or password is incorrect")
		}
	}

	const onRegister = async (event, username, email, password, clearFields) => {
		event.preventDefault()
		if (!email || !password || !username) return setError("Mandatory fields missing")
		if (validatePassword(password) === false)
			return setError(
				"Password must be 8 characters long, should have at least one of each: number, special character and uppercase letter",
			)
		setIsLoading(true)
		const res = await fetch("/auth/register", {
			body: JSON.stringify({ username, email, password }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})
		setIsLoading(false)
		const { status } = res
		if (status !== 200) return setError(await res.json())
		clearFields()
		return navigate("/login")
	}

	const onResetPassword = async (event, email, password, clearFields) => {
		event.preventDefault()
		if (!email || !password) return setError("Mandatory fields missing")
		setIsLoading(true)
		const res = await fetch("/auth/reset-password", {
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})
		setIsLoading(false)
		const { status } = res
		if (status !== 200) return setError(await res.json())
		alert(res.data)
		clearFields()
		return navigate("/login")
	}

	const onLogout = async () => {
		localStorage.removeItem("rememberMe")
		setIsLoggedIn(false)
		return navigate("/")
	}

	const checkRememberMe = () => {
		if (flag === "true") return setIsLoggedIn(true)
		// return setIsLoggedIn(false)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				onLogin,
				onResetPassword,
				onRegister,
				onLogout,
				error,
				setError,
				isLoading,
				checkRememberMe,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

AuthContextProvider.propTypes = {
	children: propTypes.node,
}

export default AuthContextProvider
