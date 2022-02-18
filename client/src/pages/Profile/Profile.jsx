import React, { useCallback, useEffect, useState } from "react"
import styles from "./Profile.module.css"

import H1 from "../../components/Headings/H1"
import Loader from "../../components/Loader/Loader"

const Profile = () => {
	const topics = ["react", "javascript"]
	const [userData, setUserData] = useState([])

	const getUserProfile = useCallback(async () => {
		const res = await fetch("/auth/profile", {
			credentials: "include",
			method: "GET",
		})
		const data = await res.json()
		if (res.status !== 200) return alert("Something went wrong")
		return setUserData(data)
	}, [])

	useEffect(() => {
		getUserProfile()
	}, [getUserProfile])

	return (
		<>
			{userData && userData.length !== 0 ? (
				<div className={styles.profile}>
					<header className={styles.header}>
						<H1 text={userData.firstName} />
						<p className={styles.header_text}>@{userData.username}</p>
						<div className={styles.header_text}>
							{topics &&
								topics.map((topic) => {
									return (
										<p key={`_${topic}`} className={styles.topic}>
											#{topic}
										</p>
									)
								})}
						</div>
					</header>
					{/* <div className={styles.profile_body}>
						<p>Joined: 12/12/12</p>
						<p>Documents: 2 published</p>
					</div> */}
				</div>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Profile
