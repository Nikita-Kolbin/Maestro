import React from 'react'
import InterfaceSite from './interface/Interface.site'

import styles from './mySite.module.scss'
import { useSelector } from 'react-redux'

const MySite = () => {
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
