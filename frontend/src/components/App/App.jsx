import React, { useEffect, useState } from 'react'

import AppRoutes from '../Routes/AppRoutes'

import Header from '../Header/Header'

import styles from './app.scss'
import { check } from '../../http/userAPI'

const App = () => {

	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		if(check()) {
			localStorage.getItem('token')
		}
			
		
	})

	return (
		<div className={styles.app}>
			<Header />

			<AppRoutes />
		</div>
	)
}

export default App
