import React, { memo, useEffect, useState } from 'react'
import Select from '../Select/Select'

import { productEdit, selectSort } from '../../utils/select'
import { useLocation } from 'react-router-dom'
import { productsModal } from '../../redux/slices/selectSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/button'

/* const filterRows = (searchText, listData) => {
	if (!searchText) {
		return listData
	}
	console.log(listData.filter((item, index) => {
		
	}))

	return listData.filter(
		row =>
			row
				.keys()
				.map(item => item.toLowerCase().includes(searchText.toLowerCase()))
		row.map(item => item.toLowerCase().includes(searchText.toLowerCase()))
	)
} */

const Table = ({ data, columns, styles }) => {
	/* const [listRow, setListRow] = useState(data)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const debounce = setTimeout(() => {
			const filteredRows = filterRows(searchTerm, data)
			setListRow(filteredRows)
		}, 300)
		return () => clearTimeout(debounce)
	}, [searchTerm]) */

	const location = useLocation()
	const [isProductsPage, setProductsPage] = useState(false)
	const [valueSelect, setValueSelect] = useState(
		useSelector(state => state.select.productsModal)
	)
	/* 	let value = useSelector(state => state.select.productsModal)
	 */
	const resetSelect = () => {
		productsModal('Редактировать каталог')
		setValueSelect('Редактировать каталог')
		console.log(valueSelect)
	}

	useEffect(() => {}, [valueSelect])

	useEffect(() => {
		if (location.pathname === '/admin/products') {
			setProductsPage(true)
		} else {
			setProductsPage(false)
		}
	}, [location])

	return (
		<section className={styles.table}>
			<div className={styles.table__head}>
				<div className={styles.table__headLeft}>
					<input
						placeholder='Поиск...'
						className={styles.table__search}
						/* value={searchTerm} */
						/* onChange={e => setSearchTerm(e.target.value)} */
					></input>
					<Select
						styles={styles}
						name={'sort'}
						id={'sort'}
						optionArray={columns.map(column => column.heading)}
					/>
				</div>
				{isProductsPage && (
					<div className={styles.table__headRight}>
						{(valueSelect !== 'Удалить товары' && (
							<Select
								styles={styles}
								name={'productsSelect'}
								id={'productsSelect'}
								optionArray={productEdit}
								reducer={productsModal}
							/>
						)) ||
							(valueSelect === 'Удалить товары' && (
								<div className={styles.table__buttons}>
									<Button
										buttonText={'Удалить'}
										colorBack={'var(--color-black)'}
										colorText={'var(--color-light)'}
										width={92}
									/>

									<Button
										buttonText={'Отменить'}
										colorBack={'var(--color-light)'}
										colorText={'var(--color-black)'}
										width={106}
										onClick={() => resetSelect()}
									/>
								</div>
							))}
					</div>
				)}
			</div>
			<table className={styles.table__body}>
				<thead>
					<tr>
						{columns.map((item, index) => (
							<TableHeadItem key={index} item={item} styles={styles} />
						))}
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((item, index) => (
							<TableRow
								key={index}
								item={item}
								columns={columns}
								styles={styles}
							/>
						))}
				</tbody>
			</table>
		</section>
	)
}

const TableHeadItem = ({ item, styles }) => (
	<th className={styles.table__header} key={item.id}>
		{item.heading}
	</th>
)
const TableRow = ({ item, columns, styles }) => (
	<tr className={styles.table__row}>
		{columns.map((columnItem, index) => {
			return (
				<td key={index} className={styles.table__cell}>
					{item[columnItem.value] ? (
						item[columnItem.value]
					) : (
						<input type='checkbox'></input>
					)}
				</td>
			)
		})}
	</tr>
)

export default Table
