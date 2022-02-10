import React from "react"
import propTypes from "prop-types"
import { NavLink } from "react-router-dom"

import Wrapper from "../Wrapper/Wrapper"
import styles from "./Navbar.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"
import Logo from "../../assets/svg/logo.png"

const Navbar = ({ isDropdownVisible, setIsDropdownVisible }) => {
	return (
		<nav className={styles.nav}>
			<Wrapper style={InlineWraperStyles}>
				<div className={styles.logo}>
					<NavLink
						className={styles.a}
						to="/"
						onClick={setIsDropdownVisible.bind(null, false)}>
						<img src={Logo} alt="docHub" />
					</NavLink>
					<span className={styles.special}>doc</span>
					Hub
				</div>
				<ul
					className={
						isDropdownVisible === false
							? styles.links + " " + styles.hidden
							: styles.links
					}>
					<li
						className={
							isDropdownVisible === false
								? styles.link + " " + styles.hiddenLink
								: styles.link
						}>
						<NavLink
							className={styles.a}
							to="/"
							onClick={setIsDropdownVisible.bind(null, !isDropdownVisible)}>
							Home
						</NavLink>
					</li>
					<li
						className={
							isDropdownVisible === false
								? styles.link + " " + styles.hiddenLink
								: styles.link
						}>
						<NavLink
							className={styles.a}
							to="/search"
							onClick={setIsDropdownVisible.bind(null, !isDropdownVisible)}>
							Search
						</NavLink>
					</li>

					<li
						className={
							isDropdownVisible === false
								? styles.link + " " + styles.hiddenLink
								: styles.link
						}>
						<NavLink
							className={styles.a}
							to="/login"
							onClick={setIsDropdownVisible.bind(null, !isDropdownVisible)}>
							Login
						</NavLink>
					</li>
				</ul>
				<div className={styles.burger}>
					<svg
						onClick={setIsDropdownVisible.bind(null, !isDropdownVisible)}
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
Navbar.propTypes = {
	isNavVisible: propTypes.bool,
	setIsDropdownVisible: propTypes.func,
}
export default Navbar
