import React, { useEffect, useState } from 'react'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'

import cabinetStyles from '../Cabinet/cabinet.module.scss'
import stylesTable from '../Table/table.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/slices/productsSlice'
import { ProductsModalInterface } from './Products-modal/Products-modal.interface'

const Products = () => {
	const dispatch = useDispatch()

	const [dataTable, setDataTable] = useState()
	const data = useSelector(state => state.products.productsList)

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	useEffect(() => {
		setDataTable(data)
	}, [data])

	const columns = [
		/* { heading: '', value: 'checkbox' }, */
		{ heading: 'Товар', value: 'name' },
		{ heading: 'ID', value: 'id' },
		{ heading: 'Количество', value: 'count' },
		{ heading: 'Цена', value: 'price' },
		{ heading: 'Статус', value: 'active' },
	]

	return (
		<>
			<section className={cabinetStyles.personalCabinet + ` container`}>
				<Sidebar />
				<Table data={dataTable} columns={columns} styles={stylesTable} />
				<ProductsModalInterface />

			</section>
		</>
	)
}

export default Products
