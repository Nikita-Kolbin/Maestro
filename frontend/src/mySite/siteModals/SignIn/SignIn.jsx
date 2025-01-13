import React, { useEffect, useRef, useState } from 'react'

import styles from './signIn.module.scss'
import Button from '../../../components/button/button'
import { useDispatch, useSelector } from 'react-redux'
import {
	loginCustomer,
	registrationCustomer,
} from '../../../redux/slices/customerSlice'
import { useLocation } from 'react-router-dom'

const SignIn = ({ keyWord, clearOpenModal }) => {
	const signInModal = useRef()
	const location = useLocation()
	const dispatch = useDispatch()
	const [isLoginPage, setIsLoginPage] = useState(true)
	const { isAuth } = useSelector(state => state.customer)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (keyWord === 'signin') {
			signInModal.current.showModal()
		} else {
			signInModal.current.close()
		}
	}, [keyWord])

	useEffect(() => {
		if (isAuth) {
			clearOpenModal()
			
		}
	}, [isAuth])

	const handleCloseOverlay = e => {
		if (e.target.classList.contains('modal')) {
			signInModal.current.close()
			clearOpenModal()
		}
	}

	const handleSubmit = async () => {
		try {
			const alias = location.pathname.slice(
				location.pathname.indexOf('site') + 5
			)
			if (isLoginPage) {
				dispatch(loginCustomer({ alias, email, password }))
			} else {
				dispatch(registrationCustomer({ alias, email, password }))
			}
		} catch (e) {
			alert(e)
		}
	}

	return (
		<dialog
			ref={signInModal}
			className={`modal ` + styles.signin}
			onClick={handleCloseOverlay}
		>
			<div className={styles.signin__wrapper}>
				<h2>SignIn</h2>
				<form className={styles.signin__form}>
					<label>
						<input
							className={styles.auth__field}
							type='email'
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='Электронная почта'
						/>
					</label>
					<label>
						<input
							className={styles.auth__field}
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Пароль'
						/>
					</label>
					<Button
						buttonText={isLoginPage ? 'Войти' : 'Зарегистрироваться'}
						width={200}
						colorBack={'var(--color-black)'}
						colorText={'var(--color-light)'}
						onClick={handleSubmit}
					/>
				</form>
				<div className={styles.auth__text}>
					{isLoginPage ? (
						<div>
							Нет аккаунта?{' '}
							<button
								className={styles.linkButton}
								onClick={() => setIsLoginPage(false)}
							>
								Зарегистрируйтесь!
							</button>
						</div>
					) : (
						<div>
							Есть аккаунт?{' '}
							<button
								className={styles.linkButton}
								onClick={() => setIsLoginPage(true)}
							>
								Войдите!
							</button>
						</div>
					)}
				</div>
			</div>
		</dialog>
	)
}

export default SignIn
