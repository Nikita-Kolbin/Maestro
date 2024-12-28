import React, { useEffect } from 'react'
import InterfaceSite from './interface/Interface.site'

import styles from './mySite.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MySite = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
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
	const siteSections = useSelector(state => state.site.listBlocks)

	return (
		<body className={styles.body}>
			{siteSections.length ? (
				siteSections.map(({ style_id, text, image_id }) => (
					<InterfaceSite id={style_id} text={text} imageId={image_id} />
				))
			) : (
				<h1>404 not found</h1>
			)}
		</body>
	)
}

export default MySite
