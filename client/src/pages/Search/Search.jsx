import React, { useState } from "react"

import styles from "./Search.module.css"

import Card from "../../components/Card/Card"
import H1 from "../../components/Headings/H1"
import { getSearchData } from "./Search.services"

const Search = () => {
	const [searchField, setSearchField] = useState("")
	const [results, setResults] = useState([])

	return (
		<div className={styles.search}>
			<H1 text="Search" key="search" />
			<div className={styles.search_field}>
				<input
					type="text"
					id="searchField"
					value={searchField}
					onChange={(event) => setSearchField(event.target.value)}
					placeholder="React, Nodejs..."
				/>
				<svg
					onClick={() =>
						getSearchData(searchField).then((data) => {
							setResults(data)
						})
					}
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					className={`bi bi-search ${styles.search_icon}`}
					viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
				</svg>
			</div>
			<>
				{results &&
					results.map((item) => {
						return <Card key={item._id} title={item.name} owner={item.uploadedBy} />
					})}
			</>
		</div>
	)
}

export default Search
