import React, { useState } from 'react'
import styles from './header.module.scss'

import BASKET from '../../../assets/images/icon_basket.svg'
import CUSTOMER from '../../../assets/images/icon_lk.png'
import SignIn from '../../siteModals/SignIn/SignIn'
import Basket from '../../siteModals/Basket/Basket'
import { useSelector } from 'react-redux'
import Lk from '../../siteModals/Lk/Lk'

const Header2 = () => {
	const [openModal, setOpenModal] = useState('')
	const { isAuth } = useSelector(state => state.customer)

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
						<a href='#catalog'>Каталог</a>
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
				{isAuth && (
					<div className={styles.cartIcon}>
						<button
							className={styles.cartButton}
							onClick={() => setOpenModal('basket')}
						>
							<img src={BASKET} alt='BASKET' />
						</button>
					</div>
				)}
				{isAuth ? (
					<button
						className={styles.lkButton}
						onClick={() => setOpenModal('lk')}
					>
						<img src={CUSTOMER} alt='CUSTOMER' />
					</button>
				) : (
					<button
						className={styles.loginButton}
						onClick={() => setOpenModal('signin')}
					>
						Вход
					</button>
				)}
			</div>
			<SignIn keyWord={openModal} clearOpenModal={() => setOpenModal('')} />
			<Basket keyWord={openModal} clearOpenModal={() => setOpenModal('')} />
			<Lk keyWord={openModal} clearOpenModal={() => setOpenModal('')} />
		</header>
	)
}

export default Header2
