import React, { useEffect, useState } from 'react'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'

import cabinetStyles from '../Cabinet/cabinet.module.scss'
import stylesTable from '../Table/table.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setActual } from '../../redux/slices/productsSlice'
import { ProductsModalInterface } from './Products-modal/Products-modal.interface'
import { getSite } from '../../redux/slices/websiteSlice'

const Products = () => {
	const dispatch = useDispatch()

	const { nameSite } = useSelector(state => state.site)
	const [dataTable, setDataTable] = useState()
	const data = useSelector(state => state.products.productsList)

	useEffect(() => {
		if (nameSite) {
			dispatch(getProducts(nameSite))
		}
	}, [nameSite])

	useEffect(() => {
		setDataTable(data)
	}, [data])

	/* console.log('useSelector Products.list')
	console.log(data) */

	const columns = [
		{ heading: 'Товар', value: 'name' },
		{ heading: 'ID', value: 'id' },
		{ heading: 'Количество', value: 'tags' },
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
