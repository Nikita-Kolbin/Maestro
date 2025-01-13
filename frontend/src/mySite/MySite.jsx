import React, { useEffect } from 'react'
import InterfaceSite from './interface/Interface.site'

import styles from './mySite.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProfileCustomer, setSiteAlias } from '../redux/slices/customerSlice'
import { getActiveProducts } from '../redux/slices/productsActiveSlice'
import { getCartProducts } from '../redux/slices/cartSlice'

const MySite = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { isAuth } = useSelector(state => state.customer)
	/* todo
	useEffect(() => {
		if (navigate.pathname.indexOf('/site')) {
			const nameSite = navigate.pathname.slice(
				navigate.pathname.indexOf('/site') + 6
			)
			console.log('nameSite')
			console.log(nameSite)
		}
	}, [navigate])
 */
	useEffect(() => {
		const alias = location.pathname.slice(location.pathname.indexOf('site') + 5)
		dispatch(setSiteAlias(alias))
		dispatch(getActiveProducts(alias))
		if (isAuth) {
			dispatch(getCartProducts())
			dispatch(getProfileCustomer())
		}
	}, [dispatch, isAuth])

	const siteSections = useSelector(state => state.site.listBlocks)

	return (
		<body className={styles.body}>
			{siteSections.length ? (
				siteSections.map(({ style_id, text, image_id }) => (
					<InterfaceSite id={style_id} text={text} imageId={image_id} />
				))
			) : (
				<h1>Loading</h1>
			)}
		</body>
	)
}

export default MySite
