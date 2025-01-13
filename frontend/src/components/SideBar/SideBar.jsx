import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES, ROUTESITE } from '../../utils/routes'

import styles from './sidebar.module.scss'
import stylesNav from './nav.module.scss'

const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<nav className={`${styles.sidebar__nav} ${stylesNav.nav}`}>
				<ul className={stylesNav.nav__list}>
					<h2 className={stylesNav.nav__title}>CRM</h2>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.CABINET}>
							Кабинет
						</NavLink>
					</li>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.ORDERS}>
							Заказы
						</NavLink>
					</li>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.PRODUCTS}>
							Товары
						</NavLink>
					</li>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.CLIENTS}>
							Клиенты
						</NavLink>
					</li>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.ANALYTICS}>
							Аналитика
						</NavLink>
					</li>
					<h2 className={stylesNav.nav__title}>Редактор сайта</h2>

					<li className={stylesNav.nav__item}>
						<NavLink
							className={stylesNav.nav__link}
							to={ROUTESITE.MYSITE}
							target='_blank'
						>
							Мой сайт
						</NavLink>
					</li>

					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.THEME}>
							Темы
						</NavLink>
					</li>
					<li className={stylesNav.nav__item}>
						<NavLink className={stylesNav.nav__link} to={ROUTES.PAGESSITE}>
							Конструктор
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default Sidebar
