import axios from "axios"
import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"

import styles from "./Homepage.module.css"

const Homepage = () => {
	const getData = async () => {
		const res = await axios.get("/docs/search?topic=flutter", {
			withCredentials: true,
		})
	}
	useEffect(() => {
		getData()
	}, [])

	return (
		<div className={styles.homepage}>
			<div className={styles.hero}>
				<h1>docHub</h1>
				<p>Documentations for developers, by developers</p>
			</div>
			<div className={styles.row}>
				<h2 className={styles.h2}>Getting started</h2>
				<p className={styles.p}>
					Register as a contributor to get started with adding your own documents for
					others to use. Viewing and downloading documents, on the other hand, needs no
					registration.
				</p>
				<br />
				<p className={styles.p}>
					In case you see something that isn't working the way it should, feel free to
					report it using the Report Issue link.
				</p>
			</div>
			<div className={styles.row}>
				<NavLink className={styles.a} to={"/search"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						className={`bi bi-search ${styles.svg}`}
						viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
					</svg>
					{/* <p className={styles.p} style={{ marginLeft: "0.5rem" }}> */}
					Search
					{/* </p> */}
				</NavLink>
			</div>
		</div>
	)
}

export default Homepage
