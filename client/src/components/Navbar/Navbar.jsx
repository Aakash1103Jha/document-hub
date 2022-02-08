import React from "react"
import { NavLink } from "react-router-dom"

import Wrapper from "../Wrapper/Wrapper"
import styles from "./Navbar.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"
import Logo from "../../assets/svg/logo.png"

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<Wrapper style={InlineWraperStyles}>
				<div className={styles.logo}>
					<img src={Logo} alt="docHub" />
					<span className={styles.special}>doc</span>
					Hub
				</div>
				<ul className={styles.links}>
					<li className={styles.link}>
						<NavLink className={styles.a} to="/search">
							Search
						</NavLink>
					</li>
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
				<div className={styles.burger}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-list"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
				</div>
			</Wrapper>
		</nav>
	)
}

export default Navbar
