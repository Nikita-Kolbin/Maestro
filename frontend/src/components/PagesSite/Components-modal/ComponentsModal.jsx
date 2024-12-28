import React, { useEffect, useRef } from 'react'

import styles from './componentsModal.module.scss'
import Button from '../../button/button'

const ComponentsModal = ({ componentsList, getIdAddBlock }) => {
	const componentsModal = useRef()
	/* const [activeId, setActiveId] = useState(null) */

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
								<li>
									<div className={styles.componentsModal__componentItem}>
										<h3 className={styles.componentsModal__componentTitle}>
											{item['title']}
										</h3>
										<img
											className={styles.componentsModal__componentImg}
											src={item['imageSrc']}
											alt={item['title']}
										/>
										<Button
											width={150}
											buttonText={'Добавить блок'}
											onClick={() => {
												getIdAddBlock(item['id'])
												componentsModal.current.close()
											}}
										/>
									</div>
								</li>
							))}
					</ul>
				</div>
			</dialog>
		</div>
	)
}

export default ComponentsModal
