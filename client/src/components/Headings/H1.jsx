import React from "react"
import propTypes from "prop-types"

const H1 = ({ text, ...rest }) => {
	const styles = {
		fontSize: "2rem",
		color: "var(--gray)",
		textAlign: "center",
	}
	return (
		<h1 style={styles} {...rest}>
			{text}
		</h1>
	)
}
H1.propTypes = {
	text: propTypes.string,
}
export default H1
