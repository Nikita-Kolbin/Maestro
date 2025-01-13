import React, { useEffect, useRef, useState } from 'react'

import styles from './order.module.scss'

import { useDispatch, useSelector } from 'react-redux'

const OrderCustomer = ({ keyWord, clearOpenModal }) => {
	const OrderModal = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		if (keyWord === 'order') {
			OrderModal.current.showModal()
		} else {
			OrderModal.current.close()
		}
	}, [keyWord])

	const handleCloseOverlay = e => {
		if (e.target.classList.contains('modal')) {
			OrderModal.current.close()
			clearOpenModal()
		}
	}

	return (
		<dialog
			className={`modal ${styles.lk}`}
			onClick={handleCloseOverlay}
			ref={OrderModal}
		>
			<div className={styles.signin__wrapper}>Order</div>
		</dialog>
	)
}

export default OrderCustomer
