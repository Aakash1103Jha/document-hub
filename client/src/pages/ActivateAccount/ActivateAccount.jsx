import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import styles from "./ActivateAccount.module.css"

import { activeUserAccount } from "./ActivateAccount.services"

const ActivateAccount = () => {
	const navigate = useNavigate()

	const userToken = useLocation().pathname.split("/")[2]

	useEffect(() => {
		activeUserAccount(userToken).then((data) => {
			console.log(data)
			if (data !== undefined && data.status === 200) {
				alert(data.message)
				return navigate("/login")
			}
			if (data === undefined) {
				alert(data.message)
				return navigate("/")
			}
		})
	}, [userToken, navigate])

	return <div className={styles.activate_account}>account activation</div>
}

export default ActivateAccount
