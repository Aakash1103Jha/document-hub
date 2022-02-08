import React from "react"
import styles from "./Homepage.module.css"

const Homepage = () => {
	return (
		<div className={styles.homepage}>
			<div className={styles.hero}>
				<h1>documentHub</h1>
				<p>Documentations for developers, by developers</p>
			</div>
		</div>
	)
}

export default Homepage
