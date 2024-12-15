import React, { useEffect, useState } from 'react'

import AppRoutes from '../Routes/AppRoutes'

import Header from '../Header/Header'

import styles from './app.scss'
import { check } from '../../http/userAPI'
import { useDispatch } from 'react-redux'
import { getSite } from '../../redux/slices/websiteSlice'
import { getProducts } from '../../redux/slices/productsSlice'

const App = () => {
	/* const [isLoading, setLoading] = useState(true) */

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSite())
		/* dispatch(getProducts()) */
		//todo getSite if (user)
	}, [])

	return (
		<div className={styles.app}>
			<Header />

			<AppRoutes />
		</div>
	)
}

export default App
