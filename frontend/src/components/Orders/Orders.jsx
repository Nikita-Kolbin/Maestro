import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'
import cabinetStyles from '../Cabinet/cabinet.module.scss'

import stylesTable from '../Table/table.module.scss'

const Orders = () => {
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
		axios('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				setDataTable(response.data)
			})
			.catch(error => console.log(`setDataTable`, error))
	}, [])

	const columns = [
		{ heading: 'id', value: 'id' },
		{ heading: 'Сумма', value: 'name' },
		{ heading: 'Дата', value: 'username' },
		{ heading: 'Клиент', value: 'phone' },
		{ heading: 'Статус', value: 'website' },
	]

	/* const columns = [
		{ heading: 'Id', value: 'id' },
		{ heading: 'Сумма', value: 'summ' },
		{ heading: 'Дата', value: 'date' },
		{ heading: 'Клиент', value: 'client' },
		{ heading: 'Статус', value: 'status' },
	] */

	return (
		<>
			<section className={cabinetStyles.personalCabinet + ` container`}>
				<Sidebar />
				<Table data={dataTable} column={columns} styles={stylesTable} />
			</section>
		</>
	)
}

export default Orders
