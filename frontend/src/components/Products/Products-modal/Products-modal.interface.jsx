import React from 'react'
import { useSelector } from 'react-redux'
import ProductsModal from './Products-modal'

export const ProductsModalInterface = () => {
	const value = useSelector(state => state.select.productsModal)

	switch (value) {
		case 'Добавить товар':
			return <ProductsModal active={true} />

		case 'Удалить товары': {
			break
		}
		case 'Настройки категорий':
			break
		default: {
			break
		}
	}
}
