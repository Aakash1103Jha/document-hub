import React, { useContext } from "react"
import { NavLink } from "react-router-dom"

import Wrapper from "../Wrapper/Wrapper"

import styles from "./Footer.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"
import { AuthContext } from "../../context/AuthContext"

const Footer = () => {
	const { isLoggedIn } = useContext(AuthContext)

	return (
		<footer className={styles.footer}>
			<Wrapper
				style={{
					...InlineWraperStyles,
					flexDirection: "column",
					justifyContent: "center",
				}}>
				<div className={styles.row}>
					<a
						href="https://github.com/Aakash1103Jha/document-hub/issues"
						target="_blank"
						rel="noreferrer">
						Report Issue
					</a>
					<NavLink to="/privacy">Privacy</NavLink>
					{isLoggedIn === false && <NavLink to="/register">Register</NavLink>}
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
