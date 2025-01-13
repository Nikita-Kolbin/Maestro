import React, { useEffect, useState } from 'react'
import styles from './catalog.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import NO_IMAGE from '../../../assets/images/no_image.png'
import {
	addProductToCart,
	getCartProducts,
} from '../../../redux/slices/cartSlice'

const Catalog1 = () => {
	const products = useSelector(state => state.productsActive.productsList)
	return (
		<section className={styles.catalog} id={'catalog'}>
			<h1>Каталог товаров</h1>
			<div className={styles.productList}>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	)
}

const ProductCard = ({ product }) => {
	const dispatch = useDispatch()
	const cartItems = useSelector(state => state.cart.productsList)
	const currentItem = cartItems.find(item => item.product.id === product.id)

	const currentCount = currentItem ? currentItem.count : 0
	const [count, setCount] = useState(currentCount)

	const handleBuyClick = () => {
		if (currentCount === 0) {
			setCount(count + 1)
			dispatch(addProductToCart({ count: 1, product_id: product.id }))
		}
	}

	const increment = () => {
		setCount(count + 1)
		dispatch(addProductToCart({ count: count + 1, product_id: product.id }))
	}

	const decrement = () => {
		setCount(count - 1)
		if (count > 1) {
			dispatch(addProductToCart({ count: count - 1, product_id: product.id }))
		} else if (count === 1) {
			dispatch(addProductToCart({ count: 0, product_id: product.id }))
		}
	}

	return (
		<div className={styles.productCard}>
			<img
				src={`http://localhost:8082/api/file/get-image/${product.image_ids}`}
				onError={e => {
					e.target.src = NO_IMAGE
				}}
				alt={product.name}
				className={styles.productImage}
			/>
			<h3 className={styles.productName}>{product.name}</h3>
			<p className={styles.productPrice}>{product.price} ₽</p>
			{count === 0 ? (
				<button className={styles.buyButton} onClick={handleBuyClick}>
					Купить
				</button>
			) : (
				<div className={styles.counter}>
					<button className={styles.counterButton} onClick={decrement}>
						-
					</button>
					<span>{count}</span>
					<button className={styles.counterButton} onClick={increment}>
						+
					</button>
				</div>
			)}
		</div>
	)
}

export default Catalog1
