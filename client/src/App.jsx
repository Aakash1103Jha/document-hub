import React, { lazy, Suspense, useState } from "react"
import { Routes, Route } from "react-router-dom"

import styles from "./App.module.css"
import Wrapper from "./components/Wrapper/Wrapper"
import Loader from "./components/Loader/Loader"
import Ribbon from "./components/Ribbon/Ribbon"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

const Homepage = lazy(() => import("./pages/Homepage/Homepage"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))
const Search = lazy(() => import("./pages/Search/Search"))
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"))

const App = () => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)

	return (
		<div className={styles.App}>
			<Ribbon />
			<Navbar
				isDropdownVisible={isDropdownVisible}
				setIsDropdownVisible={setIsDropdownVisible}
			/>
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
						exact
						path="/search"
						element={
							<Suspense fallback={<Loader />}>
								<Search />
							</Suspense>
						}
					/>
					<Route
						exact
						path="/login"
						element={
							<Suspense fallback={<Loader />}>
								<AuthPage />
							</Suspense>
						}
					/>
					<Route
						exact
						path="/register"
						element={
							<Suspense fallback={<Loader />}>
								<AuthPage />
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
			<Footer />
			<Ribbon />
		</div>
	)
}

export default App
