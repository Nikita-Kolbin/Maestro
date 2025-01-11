import React from 'react'
import styles from './header.module.scss' // Импортируйте стили из SCSS

import BASKET from '../../../assets/images/basket.svg'

const Header2 = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<a href='#home'>LOGO</a>{' '}
			</div>
			<nav className={styles.navMenu}>
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
			<div className={styles.authButtons}>
				<div className={styles.cartIcon}>
					<button className={styles.cartButton}>
						<img src={BASKET} alt='BASKET' />
					</button>
				</div>
				<button className={styles.loginButton}>Вход</button>
			</div>
		</header>
	)
}

export default Header2
