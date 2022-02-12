import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"

import styles from "./SearchDetail.module.css"

import { getDocumentData } from "./SearchDetail.services"
import Loader from "../../../components/Loader/Loader"

const SearchDetail = () => {
	const id = useLocation().pathname.split("/")[2]
	const [data, setData] = useState([])

	useEffect(() => {
		getDocumentData(id).then((doc) => setData(doc))
	}, [id])

	return (
		<div className={styles.search_detail}>
			{data && data.length === 0 ? <Loader /> : <>{data.name}</>}
		</div>
	)
}
export default SearchDetail
