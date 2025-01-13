import React, { useEffect, useRef, useState } from 'react'
import styles from './basket.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import NO_IMAGE from '../../../assets/images/no_image.png'
import {
	addProductToCart,
	getCartProducts,
} from '../../../redux/slices/cartSlice'
import { orderСreate } from '../../../redux/slices/ordersSlice'

const Basket = ({ keyWord, clearOpenModal }) => {
	const BasketModal = useRef()
	const dispatch = useDispatch()
	const products = useSelector(state => state.cart.productsList)
	const [localCounts, setLocalCounts] = useState({})
	const [isOrdering, setIsOrdering] = useState(false)
	const [isOrderSuccess, setIsOrderSuccess] = useState(false) // Новое состояние для успешного оформления
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		deliveryMethod: 'pickup',
		paymentMethod: 'cash',
		comment: '',
	})

	useEffect(() => {
		const initialCounts = {}
		products.forEach(({ product, count }) => {
			initialCounts[product.id] = count
		})
		setLocalCounts(initialCounts)
	}, [products])

	const handleQuantityChange = (id, change) => {
		setLocalCounts(prevCounts => {
			const newCount = (prevCounts[id] || 0) + change

			if (newCount < 0) {
				return prevCounts
			}

			dispatch(addProductToCart({ count: newCount, product_id: id }))

			return {
				...prevCounts,
				[id]: newCount,
			}
		})
	}

	const calculateTotal = () => {
		return products.reduce((total, { product }) => {
			const count = localCounts[product.id] || 0
			return total + product.price * count
		}, 0)
	}

	const calculateTotalCount = () => {
		return Object.values(localCounts).reduce((total, count) => total + count, 0)
	}

	useEffect(() => {
		if (keyWord === 'basket') {
			BasketModal.current.showModal()
			dispatch(getCartProducts())
		} else {
			BasketModal.current.close()
			setIsOrdering(false)
			setIsOrderSuccess(false)
		}
	}, [keyWord])

	const handleCloseOverlay = e => {
		if (e.target.classList.contains('modal')) {
			BasketModal.current.close()
			clearOpenModal('')
		}
	}

	const handleOrderClick = () => {
		setIsOrdering(true)
	}

	const handleBackToBasket = () => {
		setIsOrdering(false)
		setIsOrderSuccess(false) // Сброс состояния успешного оформления
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleRadioChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmitOrder = e => {
		e.preventDefault()
		dispatch(orderСreate(formData.comment))
		setFormData({
			fullName: '',
			phone: '',
			email: '',
			deliveryMethod: 'pickup',
			paymentMethod: 'cash',
			comment: '',
		})

		console.log('Order submitted:', formData)
		setIsOrderSuccess(true) // Установить состояние успешного оформления
		dispatch(getCartProducts())
	}

	return (
		<dialog
			ref={BasketModal}
			className={`modal ${styles.basket}`}
			onClick={handleCloseOverlay}
		>
			<div className={styles.basketContent}>
				{isOrderSuccess ? ( // Проверка состояния успешного оформления
					<>
						<h2 className={styles.title}>Ваш заказ успешно оформлен!</h2>
						<h3 className={styles.subtitle}>
							В ближайшее время мы свяжемся с Вами и уточним детали
						</h3>
					</>
				) : !isOrdering ? (
					<>
						<h2 className={styles.title}>Корзина</h2>
						<div className={styles.productList}>
							{products.map(({ product }) => {
								const count = localCounts[product.id] || 0

								if (count === 0) return null

								return (
									<div key={product.id} className={styles.productCard}>
										<img
											src={`http://localhost:8082/api/file/get-image/${product.image_ids}`}
											onError={e => {
												e.target.src = NO_IMAGE
											}}
											alt={product.name}
											className={styles.productImage}
										/>
										<div className={styles.productDetails}>
											<div>
												<h3 className={styles.productName}>{product.name}</h3>
												<div className={styles.quantityControl}>
													<button
														className={styles.counterButton}
														onClick={() => handleQuantityChange(product.id, -1)}
													>
														-
													</button>
													<span className={styles.quantityInput}>
														{localCounts[product.id] || 0}
													</span>
													<button
														className={styles.counterButton}
														onClick={() => handleQuantityChange(product.id, 1)}
													>
														+
													</button>
												</div>
											</div>
											<p className={styles.productTotal}>
												{product.price * (localCounts[product.id] || 0)} ₽
											</p>
										</div>
									</div>
								)
							})}
						</div>
						{calculateTotal() !== 0 ? (
							<div className={styles.footer}>
								<div className={styles.basketFooter}>
									<button
										className={styles.checkoutButton}
										onClick={handleOrderClick}
									>
										Оформить заказ
										<span className={styles.totalAmount}>
											{calculateTotal()} ₽
										</span>
									</button>
								</div>
							</div>
						) : (
							<div className={styles.basketClear}>
								<h3>Ваша корзина пуста</h3>
							</div>
						)}
					</>
				) : (
					<form onSubmit={handleSubmitOrder} className={styles.orderForm}>
						<h2 className={styles.title}>Оформление заказа</h2>
						<h3 className={styles.subtitle}>Заполните информацию о себе</h3>
						<div className={styles.formGroup}>
							<input
								type='text'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
								placeholder='ФИО'
								required
								className={styles.input}
							/>
							<input
								type='tel'
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
								placeholder='Номер телефона'
								required
								className={styles.input}
							/>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								placeholder='Email'
								required
								className={styles.input}
							/>
						</div>
						<h3 className={styles.subtitle}>
							Выберите доставку и способ оплаты
						</h3>
						<div className={styles.deliveryPayment}>
							<div className={styles.delivery}>
								<label className={styles.radioLabel}>
									<input
										type='radio'
										name='deliveryMethod'
										value='pickup'
										checked={formData.deliveryMethod === 'pickup'}
										onChange={handleRadioChange}
										className={styles.radioInput}
									/>
									<span className={styles.customRadio}></span>
									Самовывоз
								</label>
								<label className={styles.radioLabel}>
									<input
										type='radio'
										name='deliveryMethod'
										value='courier'
										checked={formData.deliveryMethod === 'courier'}
										onChange={handleRadioChange}
										className={styles.radioInput}
									/>
									<span className={styles.customRadio}></span>
									Курьер
								</label>
							</div>
							<div className={styles.payment}>
								<label className={styles.radioLabel}>
									<input
										type='radio'
										name='paymentMethod'
										value='cash'
										checked={formData.paymentMethod === 'cash'}
										onChange={handleRadioChange}
										className={styles.radioInput}
									/>
									<span className={styles.customRadio}></span>
									Наличными
								</label>
								<label className={styles.radioLabel}>
									<input
										type='radio'
										name='paymentMethod'
										value='bank_transfer'
										checked={formData.paymentMethod === 'bank_transfer'}
										onChange={handleRadioChange}
										className={styles.radioInput}
									/>
									<span className={styles.customRadio}></span>
									Банковский перевод
								</label>
							</div>
						</div>
						<h3 className={styles.subtitle}>Комментарий к заказу</h3>
						<textarea
							name='comment'
							value={formData.comment}
							onChange={handleInputChange}
							placeholder='Ваш комментарий'
							className={styles.textarea}
						/>
						<h3 className={styles.subtitle}>Информация о заказе</h3>
						<div className={styles.orderSummary}>
							<p>Кол-во товаров: {calculateTotalCount()}</p>
							<p>Общая стоимость: {calculateTotal()} ₽</p>
							<p>
								Доставка:{' '}
								{formData.deliveryMethod === 'pickup' ? 'Самовывоз' : 'Курьер'}
							</p>
							<p>Итого: {calculateTotal()} ₽</p>
						</div>
						<button type='submit' className={styles.submitButton}>
							Оформить заказ
						</button>
						<button
							type='button'
							className={styles.backButton}
							onClick={handleBackToBasket}
						>
							Вернуться к корзине
						</button>
					</form>
				)}
			</div>
		</dialog>
	)
}

export default Basket
