import React, { useId, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './cabinet.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import Button from '../button/button'
import Toggle from '../Toggle/Toggle'
import Select from '../Select/Select'
import { selectMessanger } from '../../utils/select.js'

import Input from '../Input/Input.jsx'
import { createSiteAPI, getSiteAPI } from '../../http/websiteAPI'
import { getSite } from '../../redux/slices/websiteSlice'

const Cabinet = () => {
	const [isEditPage, setToggleEdit] = useState(false)
	const [nameSite, setNameSite] = useState('')

	const email = useSelector(state => state.user.email)
	const phone = useSelector(state => state.user.phone)

	const toggleEdit = () => {
		isEditPage ? setToggleEdit(false) : setToggleEdit(true)
		console.log(isEditPage)
	}

	const dispatch = useDispatch()

	const createSite = () => {
		createSiteAPI(nameSite)
			.then((name, id) => console.log(name, id))
			.then(() => dispatch(getSite()))
			.catch(er => console.log(er))
		
	}

	return (
		<>
			<section className={styles.personalCabinet + ` container`}>
				<Sidebar />
				<div className={styles.cabinet}>
					<div className={styles.cabinet__header}>
						<h2 className={styles.cabinet__title}>Контактная информация</h2>
						<Button
							className={styles.cabinet__buttonEdit}
							onClick={toggleEdit}
							colorBack={'var(--color-light)'}
							buttonText={'Редактировать'}
							width={'143px'}
							height={'36px'} // todo button change password
						/>
					</div>
					<form className={styles.cabinet__inputList}>
						<Input
							type={'email'}
							id={'email'}
							isDisable={!isEditPage}
							placeholder={email}
							label={'Электронная почта'}
						/>

						<Input
							type={'tel'}
							id={'phone'}
							isDisable={!isEditPage}
							placeholder={phone}
							label={'Телефон'}
						/>

						{/* {isEditPage && (
							<label className={styles.cabinet__label} htmlFor='password'>
								Пароль
								<input
									className={styles.cabinet__input}
									type='password'
									name='password'
									id='password'
									disable
									placeholder='************'
								/>{' '}
							
							</label>
						)} */}

						{/* 	{isEditPage && (
							<label className={styles.cabinet__label} htmlFor='newpassword'>
								Новый пароль
								<input
									className={styles.cabinet__input}
									type='password'
									name='newpassword'
									id='newpassword'
									disable
								/>{' '}
								
							</label>
						)} */}

						<label className={styles.cabinet__label} htmlFor='messanger'>
							Мессенджер
							<ul className={styles.cabinet__messangerList}>
								<li className={styles.cabinet__messangerItem}>
									<Select
										styles={styles}
										name={'messangerSelect'}
										id={'messangerSelect'}
										optionArray={selectMessanger}
									/>
								</li>
								<li className={styles.cabinet__messangerItem}>
									<input
										className={styles.cabinet__input}
										type='text'
										name='messangerInput'
										id='messangerInput'
										placeholder='@example0'
										disabled={!isEditPage}
									/>{' '}
								</li>
							</ul>
						</label>
					</form>
					<div className={styles.cabinet__createSite}>
						<h2 className={styles.cabinet__title}>Мой сайт</h2>
						<div className={styles.cabinet__createSiteActions}>
							<Button
								className={styles.cabinet__buttonEdit}
								onClick={() => createSite()}
								colorBack={'var(--color-light)'}
								buttonText={'Создать сайт'}
								width={'143px'}
								height={'36px'}
							></Button>
							<input
								className={styles.cabinet__input}
								type='text'
								value={nameSite}
								onChange={e => setNameSite(e.target.value)}
								placeholder='Название сайта'
							/>{' '}
						</div>
					</div>
					<div className={styles.cabinet__notification}>
						<h2 className={styles.cabinet__title}>Контактная информация</h2>
						<ul className={styles.cabinet__notificationList}>
							<li className={styles.cabinet__notificationItem}>
								<div className={styles.cabinet__notificationTextWrapper}>
									<h3 className={styles.cabinet__notificationTitle}>
										Получать по электронной почте
									</h3>
									<p className={styles.cabinet__notificationDescription}>
										Получать уведомления по электронной почте
									</p>
								</div>
								<Toggle id={'not1'} />
							</li>
							<li className={styles.cabinet__notificationItem}>
								<div className={styles.cabinet__notificationTextWrapper}>
									<h3 className={styles.cabinet__notificationTitle}>
										Получать через мессенджеры
									</h3>
									<p className={styles.cabinet__notificationDescription}>
										Получать уведомления через мессенджеры
									</p>
								</div>
								<Toggle id={'not2'} />
							</li>
							<li className={styles.cabinet__notificationItem}>
								<div className={styles.cabinet__notificationTextWrapper}>
									<h3 className={styles.cabinet__notificationTitle}>
										Изменения статуса заказа
									</h3>
									<p className={styles.cabinet__notificationDescription}>
										Уведомить меня о изменении статуса заказа
									</p>
								</div>
								<Toggle id={'not3'} />
							</li>
							<li className={styles.cabinet__notificationItem}>
								<div className={styles.cabinet__notificationTextWrapper}>
									<h3 className={styles.cabinet__notificationTitle}>
										Новый заказ
									</h3>
									<p className={styles.cabinet__notificationDescription}>
										Уведомить меня о новом размещенном заказе
									</p>
								</div>
								<Toggle id={'not4'} />
							</li>
							<li className={styles.cabinet__notificationItem}>
								<div className={styles.cabinet__notificationTextWrapper}>
									<h3 className={styles.cabinet__notificationTitle}>
										Новый возврат
									</h3>
									<p className={styles.cabinet__notificationDescription}>
										Уведомить меня о новом поступившем возврате
									</p>
								</div>
								<Toggle id={'not5'} />
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	)
}

export default Cabinet
