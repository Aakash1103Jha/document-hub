import React, { lazy, Suspense, useContext, useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import styles from "./App.module.css"
import Wrapper from "./components/Wrapper/Wrapper"
import Loader from "./components/Loader/Loader"
import Ribbon from "./components/Ribbon/Ribbon"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

import { AuthContext } from "./context/AuthContext"

const Homepage = lazy(() => import("./pages/Homepage/Homepage"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))
const Search = lazy(() => import("./pages/Search/Search"))
const Details = lazy(() => import("./pages/Details/Details"))
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"))
const Profile = lazy(() => import("./pages/Profile/Profile"))

const App = () => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const { checkRememberMe, isLoggedIn } = useContext(AuthContext)

	useEffect(() => {
		checkRememberMe()
	})

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
						key="home_"
						exact
						path="/"
						element={
							<Suspense fallback={<Loader />}>
								<Homepage />
							</Suspense>
						}
					/>
					<Route
						key="login_"
						exact
						path="/login"
						element={
							<Suspense fallback={<Loader />}>
								<AuthPage />
							</Suspense>
						}
					/>
					<Route
						key="register_"
						exact
						path="/register"
						element={
							<Suspense fallback={<Loader />}>
								<AuthPage />
							</Suspense>
						}
					/>
					<Route
						key="reset_pass_"
						exact
						path="/reset-password"
						element={
							<Suspense fallback={<Loader />}>
								<AuthPage />
							</Suspense>
						}
					/>
					{/* Private routes for logged in users */}
					<Route
						key="profile_"
						path="/profile"
						element={
							isLoggedIn === true ? (
								<Suspense fallback={<Loader />}>
									<Profile />
								</Suspense>
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						key="search_"
						exact
						path="/search"
						element={
							<Suspense fallback={<Loader />}>
								<Search />
							</Suspense>
						}
					/>
					<Route
						key="search_result_"
						exact
						path="/search/:id"
						element={
							<Suspense fallback={<Loader />}>
								<Details />
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
