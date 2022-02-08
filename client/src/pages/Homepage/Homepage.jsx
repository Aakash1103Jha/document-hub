import React from "react"
import styles from "./Homepage.module.css"

const Homepage = () => {
	return (
		<div className={styles.homepage}>
			<div className={styles.hero}>
				<h1>documentHub</h1>
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
		</div>
	)
}

export default Homepage
