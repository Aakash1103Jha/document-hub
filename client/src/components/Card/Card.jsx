import React from "react"
import propTypes from "prop-types"

import styles from "./Card.module.css"

const Card = ({ title, owner, ...rest }) => {
	return (
		<div className={styles.card} {...rest}>
			<h3>{title}</h3>
			<p>{owner}</p>
		</div>
	)
}
Card.propTypes = {
	title: propTypes.string,
	owner: propTypes.string,
}
export default Card
