import React, { useEffect, useRef } from 'react'

import { useDraggable } from '@dnd-kit/core'

import styles from './componentsModal.module.scss'

const ComponentsModal = ({ componentsList }) => {
	const componentsModal = useRef()
	/* const [, componentDrag] = useDraggable({
		id: 'componentDrag',
		item: componentsList,
	}) */

	useEffect(() => {
		if (componentsList) {
			componentsModal.current.show()
		} else {
			componentsModal.current.close()
		}
	}, [componentsList])

	return (
		<div className={styles.componentsModal}>
			<dialog className={styles.componentsModal__dialog} ref={componentsModal}>
				<div className={styles.componentsModal__wrapper}>
					<ul className={styles.componentsModal__componentsList}>
						{componentsList &&
							componentsList.map(item => (
								<li
									className={styles.componentsModal__componentItem}
									/* ref={componentDrag} */
								>
									<h3 className={styles.componentsModal__componentTitle}>
										{item['title']}
									</h3>
									<img
										className={styles.componentsModal__componentImg}
										src={item['imageSrc']}
										alt={item['title']}
									/>
								</li>
							))}
					</ul>
				</div>
			</dialog>
		</div>
	)
}

export default ComponentsModal
