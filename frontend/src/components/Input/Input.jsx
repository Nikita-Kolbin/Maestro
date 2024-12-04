import React from 'react'

import styles from './input.module.scss'

export const Input = props => {
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
					ref={props.ref}
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
					ref={props.ref}
				></textarea>
			</label>
		</>
	)
}
export const SelectIn = props => {
	return (
		<>
			<label className={styles.label} htmlFor={props.id}>
				{props.label}
				<select
					className={styles.label__input}
					type={props.type}
					name={props.id}
					required = {props.required}
					id={props.id}
					disabled={props.isDisable}
					placeholder={props.placeholder}
					ref={props.ref}
				></select>
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
					ref={props.ref}
				></input>
			</label>
		</>
	)
}

export default Input
