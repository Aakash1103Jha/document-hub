import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import propTypes from "prop-types"
import axios from "axios"

import { validatePassword } from "../validations/validations"

export const AuthContext = createContext({
	isLoggedIn: false,
	error: "",
	setError: () => {},
	onLogin: (event, email, password, clearFields) => {},
	onRegister: (event, username, email, password, clearFields) => {},
	onLogout: () => {},
})

const AuthContextProvider = ({ children, ...rest }) => {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [error, setError] = useState("")

	const onLogin = async (event, email, password, clearFields) => {
		event.preventDefault()
		try {
			const res = await axios.post("/auth/login", { email, password })
			const { status } = res
			if (status !== 200) return
			clearFields()
			setIsLoggedIn(true)
			navigate("/")
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
			navigate("/login")
		} catch (err) {
			console.error(err.message)
			return setError(err.message)
		}
	}

	const onLogout = async () => {}

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, onLogin, onRegister, onLogout, error, setError }}>
			{children}
		</AuthContext.Provider>
	)
}

AuthContextProvider.propTypes = {
	children: propTypes.node,
}

export default AuthContextProvider
