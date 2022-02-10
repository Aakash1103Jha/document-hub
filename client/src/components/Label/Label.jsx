import React from "react"
import propTypes from "prop-types"

import styles from "./Label.module.css"

const Label = ({ label, id, isMandatory, ...rest }) => {
	return (
		<div className={styles.label} {...rest}>
			<label htmlFor={id}>{label}</label>
			{isMandatory === true ? <span className={styles.required}> *</span> : null}
		</div>
	)
}

Label.propTypes = {
	label: propTypes.string,
	id: propTypes.string,
	isMandatory: propTypes.bool,
}

export default Label
