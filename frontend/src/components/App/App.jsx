import React, { useEffect, useState } from 'react'

import AppRoutes from '../Routes/AppRoutes'

import Header from '../Header/Header'

import styles from './app.scss'
import { check } from '../../http/userAPI'
import { useDispatch } from 'react-redux'
import { getSite, getStyleSite } from '../../redux/slices/websiteSlice'
import { getProducts } from '../../redux/slices/productsSlice'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

const App = () => {
	const [isAdminPage, setAdminPage] = useState()
	const [isEditSitePage, setEditSitePage] = useState()

	const nameSite = localStorage.getItem('nameSite')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSite())

		//todo getSite if (user)
	}, [])

	/* useEffect(() => {
		if (nameSite) {
			dispatch(getStyleSite(nameSite))
		}
		console.log(nameSite)
	}, [dispatch, nameSite])
 */
	const location = useLocation()

	useEffect(() => {
		setAdminPage(Object.values(ROUTES).includes(location.pathname))
		setEditSitePage(ROUTES.PAGESSITE === location.pathname) // rename ROUTES.PAGESSITE
	}, [location])

	return (
		<div className={styles.app}>
			{isAdminPage && !isEditSitePage && <Header />}

			<AppRoutes />
		</div>
	)
}

export default App
