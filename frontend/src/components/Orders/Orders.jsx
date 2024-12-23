import React, { useEffect, useState } from 'react'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'
import cabinetStyles from '../Cabinet/cabinet.module.scss'

import stylesTable from '../Table/table.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../redux/slices/ordersSlice'

const Orders = () => {
	const dispatch = useDispatch()

	const [dataTable, setDataTable] = useState()
	const data = useSelector(state => state.orders.ordersList)

	useEffect(() => {
		dispatch(getOrders())
	}, [])

	useEffect(() => {
		setDataTable(data)
	}, [data])

	const columns = [
		{ heading: 'ID', value: 'id' },
		{ heading: 'Сумма', value: 'total_sum' },
		{ heading: 'Дата', value: 'date_time' },
		{ heading: 'Клиент', value: 'customer_id' },
		{ heading: 'Статус', value: 'status' },
	]
	
	return (
		<>
			<section className={cabinetStyles.personalCabinet + ` container`}>
				<Sidebar />
				<Table data={dataTable} columns={columns} styles={stylesTable} />
			</section>
		</>
	)
}

export default Orders
