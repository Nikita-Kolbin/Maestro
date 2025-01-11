import React, { useRef } from 'react'

import styles from 'signIn.module.scss'

const SignIn = () => {
	const signInModal = useRef()

	return (
		<dialog ref={signInModal} open>
			<input type='text' />
			<input type='text' />
			<input type='text' />
		</dialog>
	)
}

export default SignIn
