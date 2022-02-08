import React from "react"
import { NavLink } from "react-router-dom"
import Wrapper from "../Wrapper/Wrapper"

import styles from "./Footer.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"

const Footer = () => {
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
					<NavLink to="/register">Register</NavLink>
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
