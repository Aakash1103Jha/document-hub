import React, { useContext } from "react"
import propTypes from "prop-types"
import { NavLink } from "react-router-dom"

import Wrapper from "../Wrapper/Wrapper"
import styles from "./Navbar.module.css"
import { InlineWraperStyles } from "../../assets/js/inlineWrapperStyles"
import Logo from "../../assets/svg/logo.png"
import { AuthContext } from "../../context/AuthContext"

const Navbar = ({ isDropdownVisible, setIsDropdownVisible }) => {
	const { onLogout, isLoggedIn } = useContext(AuthContext)
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
						key="home_link"
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
						key="search_link"
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

					{isLoggedIn === false && (
						<li
							key="login_link"
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
					)}
					{isLoggedIn === true && (
						<>
							<li
								className={
									isDropdownVisible === false
										? styles.link + " " + styles.hiddenLink
										: styles.link
								}>
								<NavLink
									className={styles.a}
									to="/upload"
									onClick={setIsDropdownVisible.bind(null, !isDropdownVisible)}>
									Upload
								</NavLink>
							</li>
							<li
								key="logout_link"
								className={
									isDropdownVisible === false
										? styles.link + " " + styles.hiddenLink
										: styles.link
								}>
								<NavLink
									className={styles.a}
									to="/"
									onClick={() => {
										onLogout()
										setIsDropdownVisible(!isDropdownVisible)
									}}>
									Logout
								</NavLink>
							</li>
						</>
					)}
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
