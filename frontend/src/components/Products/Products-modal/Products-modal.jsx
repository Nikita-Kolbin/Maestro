import React from 'react'

import styles from './products-modal.module.scss'
import { Input, SelectIn, TextArea, FileIn } from '../../Input/Input'

import Button from '../../button/button'

const ProductsModal = () => {
	/* const handleModalClick = ({ currentTarget, target }) => {
		const isClickedOnBackdrop = target === currentTarget

		if (isClickedOnBackdrop) {
			currentTarget.close()
		}
	}
	const productModal = document.getElementById('productModal')   //todo close modal on click
	productModal?.addEventListener('click', handleModalClick) */

	return (
		<dialog className={styles.productModal} id='productModal'>
			<div className={styles.productModal__wrapper}>
				<h3 className={styles.productModal__title}>Добавление товара</h3>
				<form method='dialog' className={styles.productModal__form}>
					<Input
						type={'text'}
						id={'nameProduct'}
						placeholder={'Введите название продукта'}
						label={'Наименование'}
						required={true}
					/>
					<SelectIn
						id={'categoryProduct'}
						placeholder={'Выберите категорию'}
						label={'Категория'}
						required={true}
					/>
					<div className={styles.productModal__uniqueField}>
						<Input
							type={'number'}
							id={'costProduct'}
							placeholder={'Введите цену'}
							label={'Цена'}
							required={true}
						/>
						<Input
							type={'number'}
							id={'countProduct'}
							placeholder={'Введите количество'}
							label={'Количество'}
							required={true}
						/>
					</div>
					<div className={styles.productModal__textareaWrapper}>
						<TextArea
							type={'text'}
							id={'descriptionProduct'}
							placeholder={'Введите описание'}
							label={'Описание'}
							
						/>
					</div>
					<div className={styles.productModal__fileWrapper}>
						<FileIn
							id={'photoProduct'}
							placeholder={'Добавить вложение'}
							label={'Галерея'}
						/>
					</div>
					<div className={styles.productModal__action}>
						<Button
							buttonText={'Cохранить'}
							colorBack={'var(--color-black)'}
							colorText={'var(--color-light)'}
							width={112}
						/>
						<Button
							buttonText={'Опубликовать'}
							colorBack={'var(--color-light)'}
							colorText={'var(--color-black)'}
							width={138}
						/>
					</div>
				</form>
			</div>
		</dialog>
	)
}

export default ProductsModal
