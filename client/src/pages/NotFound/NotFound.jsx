import React from "react"
import styles from "./NotFound.module.css"

const NotFound = () => {
	return (
		<div className={styles.notfound}>
			<h1 className={styles.h1}>404</h1>
			<p className={styles.p}>Oops! Looks like you took a wrong turn.</p>
		</div>
	)
}

export default NotFound
