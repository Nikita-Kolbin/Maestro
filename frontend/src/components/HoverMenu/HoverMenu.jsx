import React from 'react'

import styles from './hoverMenu.module.scss'

const HoverMenu = ({ id, deleteBlock }) => {
	return (
		<ul className={styles.hoverMenu}>
			<li className={styles.hoverMenu__item}>
				<button
					type='button'
					className={styles.hoverMenu__deleteBtn}
					onClick={() => deleteBlock(id)}
				>
					Del
				</button>
			</li>
		</ul>
	)
}

export default HoverMenu
