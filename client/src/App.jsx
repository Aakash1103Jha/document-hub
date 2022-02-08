import React, { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

import styles from "./App.module.css"
import Wrapper from "./components/Wrapper/Wrapper"
import Loader from "./components/Loader/Loader"
import Ribbon from "./components/Ribbon/Ribbon"
import Navbar from "./components/Navbar/Navbar"

const Homepage = lazy(() => import("./pages/Homepage/Homepage"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

const App = () => {
	return (
		<div className={styles.App}>
			<Ribbon />
			<Navbar />
			<Wrapper>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Suspense fallback={<Loader />}>
								<Homepage />
							</Suspense>
						}
					/>
					<Route
						path="*"
						element={
							<Suspense fallback={<Loader />}>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</Wrapper>
		</div>
	)
}

export default App
