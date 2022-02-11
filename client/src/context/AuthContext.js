import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import propTypes from "prop-types"
import axios from "axios"

import { validatePassword } from "../validations/validations"

export const AuthContext = createContext({
	isLoggedIn: false,
	error: "",
	setError: () => {},
	onLogin: (event, email, password, rememberMe, clearFields) => {},
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
		setIsLoading(true)
		try {
			const res = await axios.post("/auth/login", { email, password })
			setIsLoading(false)
			const { status } = res
			if (status !== 200) return
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
		if (validatePassword(password) === false)
			return setError(
				"Password must be 8 characters long, should have at least one of each: number, special character and uppercase letter",
			)
		try {
			const res = await axios.post("/auth/register", { username, email, password })
			const { status } = res
			if (!status === 200) return
			clearFields()
			return navigate("/login")
		} catch (err) {
			console.error(err.message)
			return setError(err.message)
		}
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
