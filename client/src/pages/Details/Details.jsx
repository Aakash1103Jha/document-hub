import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"

import styles from "./Details.module.css"

import { getDocumentData } from "./Detail.services"
import Loader from "../../components/Loader/Loader"
import H1 from "../../components/Headings/H1"

const Details = () => {
	const id = useLocation().pathname.split("/")[2]
	const [data, setData] = useState([])

	useEffect(() => {
		getDocumentData(id).then((doc) => setData(doc))
	}, [id])

	return (
		<>
			{data && data.length === 0 ? (
				<Loader />
			) : (
				<div className={styles.details}>
					<header className={styles.header}>
						<H1 text={data.name} key={`h1_${id}`} />
						<p className={styles.tag}>{data.topic}</p>
					</header>
					<div className={styles.doc_info}>
						{/* <p>by {data.uploadedBy.name}</p> */}
						<p>by afemalecoder</p>
					</div>
					<div className={styles.all_info}>hello</div>
				</div>
			)}
		</>
	)
}
export default Details
