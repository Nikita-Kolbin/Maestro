import React, { useId } from 'react'

import styles from './input.module.scss'
import { useForm } from 'react-hook-form'

export const Input = props => {
	const { register } = useForm()

	return (
		<>
			<label className={styles.label} htmlFor={props.id}>
				{props.label}
				<input
					className={styles.label__input}
					type={props.type}
					name={props.id}
					required={props.required}
					id={props.id}
					disabled={props.isDisable}
					placeholder={props.placeholder}
					/* ref={props.ref} */
					{...props.register}
				/>{' '}
			</label>
		</>
	)
}
export const TextArea = props => {
	return (
		<>
			<label className={styles.label} htmlFor={props.id}>
				{props.label}
				<textarea
					className={styles.label__textArea}
					type={props.type}
					name={props.id}
					required={props.required}
					id={props.id}
					disabled={props.isDisable}
					placeholder={props.placeholder}
					cols='40'
					rows='3'
					{...props.register}
				></textarea>
			</label>
		</>
	)
}
export const SelectIn = props => {
	const id = useId()
	return (
		<>
			<label className={styles.label} htmlFor={props.id}>
				{props.label}
				<select
					className={styles.label__input}
					type={props.type}
					name={props.id}
					required={props.required}
					id={props.id}
					disabled={props.isDisable}
					placeholder={props.placeholder}
					{...props.register}
				>
					{props.optionArray.map(str => (
						<option key={id + str} value={str}>
							{str}
						</option>
					))}
				</select>
			</label>
		</>
	)
}
export const FileIn = props => {
	return (
		<>
			<label className={styles.label} htmlFor={props.id}>
				{props.label}
				<input
					className={styles.label__file}
					type={'file'}
					name={props.id}
					required={props.required}
					id={props.id}
					disabled={props.isDisable}
					placeholder={props.placeholder}
					multiple
					{...props.register}
				></input>
			</label>
		</>
	)
}

export default Input
