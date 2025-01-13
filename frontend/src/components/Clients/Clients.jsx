import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'
import cabinetStyles from '../Cabinet/cabinet.module.scss'

import stylesTable from '../Table/table.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../redux/slices/clientsSlice'

const Clients = () => {
	const dispatch = useDispatch()

	const [dataTable, setDataTable] = useState()
	const data = useSelector(state => state.clients.clientsList)

	useEffect(() => {
		dispatch(getClients())
	}, [])

	useEffect(() => {
		setDataTable(data)
	}, [data])

	const columns = [
		{ heading: 'ID', value: 'id' },
		{ heading: 'Фамилия', value: 'last_name' },
		{ heading: 'Email', value: 'email' },
		{ heading: 'Телефон', value: 'phone' },
		{ heading: 'Сайт', value: 'website_alias' },
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

export default Clients
