import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './lk.module.scss'
import { Link } from 'react-router-dom'
import {
	getProfileCustomer,
	removeCustomer,
	updateProfileCustomer,
} from '../../../redux/slices/customerSlice'
import { useDispatch, useSelector } from 'react-redux'

const Lk = ({ keyWord, clearOpenModal }) => {
	const LkModal = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		if (keyWord === 'lk') {
			dispatch(getProfileCustomer())
			LkModal.current.showModal()
		} else {
			LkModal.current.close()
		}
	}, [keyWord])

	const customer = useSelector(state => state.customer)
	const [notifTg, setNotifTg] = useState(true) //todo
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: customer.email,
			phone: customer.phone,
			first_name: customer.first_name,
			father_name: customer.father_name,
			last_name: customer.last_name,
			telegram: customer.telegram,
			delivery_type: customer.delivery_type,
			payment_type: customer.payment_type,
			email_notification: customer.email_notification,
			telegram_notification: customer.telegram_notification,
		},
	})

	const handleCloseOverlay = e => {
		if (e.target.classList.contains('modal')) {
			LkModal.current.close()
			clearOpenModal()
		}
	}

	const exitCustomer = () => {
		dispatch(removeCustomer())
		reset()
		LkModal.current.close()
		window.location.reload()
	}

	const onSubmit = data => {
		dispatch(updateProfileCustomer(data))
		reset()
		LkModal.current.close()
		window.location.reload()
	}

	return (
		<dialog
			className={`modal ${styles.lk}`}
			onClick={handleCloseOverlay}
			ref={LkModal}
		>
			<div className={styles.signin__wrapper}>
				<h2>Личный кабинет</h2>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					{[
						'email',
						'phone',
						'first_name',
						'father_name',
						'last_name',
						'telegram',
						'delivery_type',
						'payment_type',
					].map((field, index) => (
						<div key={index} className={styles.inputWrapper}>
							<input
								type={field === 'email' ? 'email' : 'text'}
								required
								{...register(field)}
								className={`${
									errors[field] ? styles.inputError : styles.input
								}`}
								placeholder=' '
							/>
							<label className={styles.label}>
								{field === 'first_name'
									? 'Имя'
									: field === 'father_name'
									? 'Отчество'
									: field === 'last_name'
									? 'Фамилия'
									: field.charAt(0).toUpperCase() + field.slice(1)}
							</label>
							{errors[field] && (
								<span className={styles.errorMessage}>
									{errors[field].message}
								</span>
							)}
						</div>
					))}
					<div className={styles.checkboxWrapper}>
						<label className={styles.checkboxLabel}>
							<input
								type='checkbox'
								{...register('email_notification')}
								className={styles.checkbox}
							/>
							<span className={styles.customCheckbox}></span>
							Получать уведомления по email
						</label>
						<label className={styles.checkboxLabel}>
							<input
								type='checkbox'
								onChange={e => setNotifTg(e.target.checked)}
								{...register('telegram_notification')}
								className={styles.checkbox}
							/>
							<span className={styles.customCheckbox}></span>
							Получать уведомления в Telegram
						</label>
						{notifTg && (
							<p className={styles.notifText}>
								Для получения уведомлений в Telegram, запустите{' '}
								<Link
									className={styles.notifLink}
									to='https://t.me/maestro_oficial_bot'
								>
									Бота
								</Link>
							</p>
						)}
					</div>
					<button type='submit' className={styles.submitButton}>
						Сохранить
					</button>
					<button
						type='button'
						className={styles.exitButton}
						onClick={exitCustomer}
					>
						Выйти из личного кабинета
					</button>
				</form>
			</div>
		</dialog>
	)
}

export default Lk
