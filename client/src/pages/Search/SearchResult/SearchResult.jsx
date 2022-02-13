import React from "react"
import propTypes from "prop-types"
import { NavLink } from "react-router-dom"

import styles from "./SearchResult.module.css"

const SearchResult = ({ title, owner, id, ...rest }) => {
	return (
		<div className={styles.search_result} {...rest}>
			<h3>{title}</h3>
			<p>{owner}</p>
			<NavLink to={`${id}`}>View</NavLink>
		</div>
	)
}
SearchResult.propTypes = {
	title: propTypes.string,
	owner: propTypes.string,
	id: propTypes.string,
}
export default SearchResult
