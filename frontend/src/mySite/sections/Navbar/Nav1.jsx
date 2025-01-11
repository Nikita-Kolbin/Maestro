import React from 'react'

import styles from './nav.module.scss'

const Nav1 = props => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navList}>
				<li className={styles.navItem}>
					<a href='#home'>Главная</a>
				</li>
				<li className={styles.navItem}>
					<a href='#about'>О нас</a>
				</li>
				<li className={styles.navItem}>
					<a href='#services'>Услуги</a>
				</li>
				<li className={styles.navItem}>
					<a href='#portfolio'>Портфолио</a>
				</li>
				<li className={styles.navItem}>
					<a href='#contact'>Контакты</a>
				</li>
			</ul>
			
		</nav>
	)
}

export default Nav1
