import React from "react"
import propTypes from "prop-types"

import styles from "./Message.module.css"

export const Message = ({ message, type, ...rest }) => {
	if (type.toLowerCase() === "error") {
		return (
			<p className={styles.message + " " + styles.error} {...rest}>
				{message}
			</p>
		)
	}
	if (!type) {
		return (
			<p className={styles.message} {...rest}>
				{message}
			</p>
		)
	}
}
Message.propTypes = {
	message: propTypes.string,
	type: propTypes.string,
}
