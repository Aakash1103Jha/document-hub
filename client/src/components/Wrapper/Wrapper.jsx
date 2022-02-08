import React from "react"
import propTypes from "prop-types"

import styles from "./Wrapper.module.css"

const Wrapper = ({ children, ...rest }) => {
	return (
		<div className={styles.wrapper} {...rest}>
			{children}
		</div>
	)
}
Wrapper.propTypes = {
	children: propTypes.node,
}
export default Wrapper
