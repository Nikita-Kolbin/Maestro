import React from 'react'

import styles from './header.module.scss'

const Header1 = props => {
	return (
		<header className={styles.header}>
			<h1>Header1</h1>
			<div>{props.text}</div>
		</header>
	)
}

export default Header1
