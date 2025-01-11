import React from 'react'

import styles from './header.module.scss'

import BASKET from '../../../assets/images/basket.svg'
import SignIn from '../../siteModals/SignIn/'

const Header1 = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<a href='#home'>LOGO</a>{' '}
			</div>
			<div className={styles.authButtons}>
				<button className={styles.loginButton}>Вход</button>

				<div className={styles.cartIcon}>
					<button className={styles.cartButton}>
						<img src={BASKET} alt='BASKET' />
					</button>
				</div>
			</div>
			<SignIn />
		</header>
	)
}

export default Header1
