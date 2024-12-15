import React, { useEffect, useRef, useState } from 'react'

import styles from './products-modal.module.scss'
import { Input, SelectIn, TextArea, FileIn } from '../../Input/Input'

import Button from '../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { productСreateAPI } from '../../../http/productsAPI'


const ProductsModal = ({ active = false }) => {
	/* const handleModalClick = ({ currentTarget, target }) => {
		const isClickedOnBackdrop = target === currentTarget

		if (isClickedOnBackdrop) {
			currentTarget.close()
		}
	}
	const productModal = document.getElementById('productModal')   //todo close modal on click
	productModal?.addEventListener('click', handleModalClick) */

	const productModal = useRef(null)
	
	useEffect(() => {
		if (productModal.current) {
			productModal.current.showModal()
		}
	}, [])

	const categoryList = useSelector(state => state.category.categoryList)

	const { register, handleSubmit, setValue } = useForm()

	const nameSite = useSelector(state => state.site.nameSite)
	setValue('website_alias', nameSite)

	const onSubmit = data => {
		productСreateAPI(data)
		productModal.current.close()
		
	}

	return (
		<dialog className={styles.productModal} ref={productModal}>
			<div className={styles.productModal__wrapper}>
				<h3 className={styles.productModal__title}>Добавление товара</h3>
				<form
					method='dialog'
					onSubmit={handleSubmit(onSubmit)}
					className={styles.productModal__form}
				>
					<Input
						type={'text'}
						id={'nameProduct'}
						placeholder={'Введите название продукта'}
						label={'Наименование'}
						required={true}
						register={register('name')}
					/>
					<SelectIn
						id={'categoryProduct'}
						placeholder={'Выберите категорию'}
						label={'Категория'}
						required={true}
						optionArray={categoryList}
						register={register('categoryProduct')}
					/>
					<div className={styles.productModal__uniqueField}>
						<Input
							type={'number'}
							id={'costProduct'}
							placeholder={'Введите цену'}
							label={'Цена'}
							required={true}
							register={register('price')}
						/>
						<Input
							type={'number'}
							id={'countProduct'}
							placeholder={'Введите количество'}
							label={'Количество'}
							required={true}
							register={register('countProduct')}
						/>
					</div>
					<div className={styles.productModal__textareaWrapper}>
						<TextArea
							type={'text'}
							id={'descriptionProduct'}
							placeholder={'Введите описание'}
							label={'Описание'}
							register={register('description')}
						/>
					</div>
					<div className={styles.productModal__fileWrapper}>
						<FileIn
							id={'photoProduct'}
							placeholder={'Добавить вложение'}
							label={'Галерея'}
							register={register('file')}
						/>
					</div>
					<div className={styles.productModal__action}>
						<Button
							buttonText={'Cохранить'}
							colorBack={'var(--color-black)'}
							colorText={'var(--color-light)'}
							width={112}
							type={'submit'}
							onClick={() => {
								setValue('active', false)
							}}
						/>

						<Button
							buttonText={'Опубликовать'}
							colorBack={'var(--color-light)'}
							colorText={'var(--color-black)'}
							width={138}
							type={'submit'}
							onClick={() => {
								setValue('active', true)
							}}
						/>
					</div>
				</form>
			</div>
		</dialog>
	)
}

export default ProductsModal
