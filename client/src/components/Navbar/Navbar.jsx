import React from "react"
import { NavLink } from "react-router-dom"

import Wrapper from "../Wrapper/Wrapper"
import styles from "./Navbar.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<Wrapper style={InlineWraperStyles}>
				<div className={styles.logo}>Logo</div>
				<ul className={styles.links}>
					<li className={styles.link}>
						<NavLink className={styles.a} to="/">
							Home
						</NavLink>
					</li>
					<li className={styles.link}>
						<NavLink className={styles.a} to="/register">
							Register
						</NavLink>
					</li>
				</ul>
			</Wrapper>
		</nav>
	)
}

export default Navbar
