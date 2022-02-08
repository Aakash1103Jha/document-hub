import React from "react"
import styles from "./Loader.module.css"

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.loader_element}></div>
			<p className={styles.p}>Loading</p>
		</div>
	)
}

export default Loader
