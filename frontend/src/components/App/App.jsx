import React from 'react'

import AppRoutes from '../Routes/AppRoutes'

import Header from '../Header/Header'

import styles from './app.scss'

const App = () => {
	return (
		<div className={styles.app}>
			<Header />

			<AppRoutes />
		</div>
	)
}

export default App
