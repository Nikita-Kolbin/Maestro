import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './select.module.scss'

const Select = ({ styles, name, id, optionArray = [], reducer }) => {
	const [value, setValue] = useState()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!!reducer) {
			dispatch(reducer(value))
		}
	}, [value])

	return (
		<select
			onChange={e => {
				setValue(e.target.value)
			}}
			value={value}
			defaultValue={optionArray[0]}
			className={styles.select}
			type='select'
			name={name}
			id={id}
		>
			{optionArray.map(item => (
				<option key={id + item} className={styles.select__item} value={item}>
					{item}
				</option>
			))}
		</select>
	)
}

export default Select
