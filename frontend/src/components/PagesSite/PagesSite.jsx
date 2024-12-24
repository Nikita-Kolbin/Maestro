import React, { useState, useEffect } from 'react'
import axios from 'axios'

import iconViewSite from '../../assets/images/ic_view-site.svg'
import iconHeader from '../../assets/images/icon_components/ic_header.png'
import iconFooter from '../../assets/images/icon_components/ic_footer.png'

import Table from '../Table/Table'
import Sidebar from '../Sidebar/Sidebar'

import stylesTable from '../Table/table.module.scss'
import cabinetStyles from '../Cabinet/cabinet.module.scss'
import styles from './pagesSite.module.scss'
import Button from '../button/button'
import { ROUTESITE } from '../../utils/routes'
import ComponentsModal from './Components-modal/ComponentsModal'

import { componentsMap } from '../../utils/componentLists'
import Header1 from '../../mySite/sections/Headers/Header1'
import MySite from '../../mySite/MySite'
import { DndContext, useDroppable } from '@dnd-kit/core'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStyleSite, setStyleSite } from '../../redux/slices/websiteSlice'
import InterfaceSite from '../../mySite/interface/Interface.site'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import BlockSiteItem from '../BlockSiteItem/BlockSiteItem'

const PagesSite = () => {
	const [valueRadio, setValue] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onToggleValue = (evt, nameComponent) => {
		if (valueRadio && valueRadio === nameComponent) {
			setValue('')
		} else {
			setValue(nameComponent)
		}
	}

	const selectedComponent = componentsMap[valueRadio] || null

	const listBlockSite = useSelector(state => state.site.listBlocks)

	const nameSite = useSelector(state => state.site.nameSite)

	/* 	const list = [
		{
			image_id: 'string',
			style_id: 1,
			text: ' or 2',
		},
		{
			image_id: 'string',
			style_id: 2,
			text: 'string',
		},
		{
			image_id: 'string',
			style_id: 3,
			text: 'string',
		},
		{
			image_id: 'string',
			style_id: 10,
			text: 'string',
		},
	]
 */

	const saveEditSite = (nameSite, listBlocks) => {
		const data = {
			sections: listBlocks,
			website_alias: nameSite,
		}
		dispatch(setStyleSite(data))
	}

	/* const [ dropRef] = useDroppable({
		id: 'componentDrag',
	}) */

	const [listBlock, setListBlock] = useState(listBlockSite)

	useEffect(() => {
		if (listBlockSite.length > 0 && listBlock.length === 0) {
			setListBlock(listBlockSite)
		}
	}, [listBlockSite])

	const handelDragEnd = evt => {
		const { active, over } = evt

		if (over && active.id !== over.id) {
			setListBlock(listBlock => {
				const oldIndex = listBlock.findIndex(item => item.id === active.id)
				const newIndex = listBlock.findIndex(item => item.id === over.id)

				return arrayMove(listBlock, oldIndex, newIndex)
			})
		}
	}

	return (
		<div className={styles.builder}>
			<header className={styles.builder__header}>
				<ul className={styles.builder__headerList}>
					<li className={styles.builder__headerButton}>
						<Button
							width={200}
							height={36}
							colorBack={'var(--color-white)'}
							buttonText={'Выйти без сохранения'}
							onClick={() => navigate(-1)}
						/>
					</li>
					<li className={styles.builder__headerLink}>
						<Link to={ROUTESITE.MYSITE} target='_blank'>
							<img src={iconViewSite} alt='iconViewSite' />
						</Link>
					</li>
					<li className={styles.builder__headerButtons}>
						<Button
							buttonText={'Cохранить'}
							colorBack={'var(--color-black)'}
							colorText={'var(--color-light)'}
							width={108}
							type={'submit'}
							onClick={() => {}}
						/>

						<Button
							buttonText={'Опубликовать'}
							colorBack={'var(--color-light)'}
							colorText={'var(--color-black)'}
							width={138}
							type={'submit'}
							onClick={() => {
								saveEditSite(nameSite, listBlock)
							}}
						/>
					</li>
				</ul>
			</header>
			<div className={styles.builder__wrapper}>
				<aside className={styles.builder__componentList}>
					<input
						className={styles.builder__componentInput}
						id='123'
						type='radio'
						name='components'
						checked={valueRadio === 'headersList'}
						onClick={e => onToggleValue(e, 'headersList')}
					/>
					<label className={styles.builder__componentLabel} htmlFor='123'>
						<img
							className={styles.builder__componentImg}
							src={iconHeader}
							alt='icon Header'
						/>
						<span className={styles.builder__componentTitle}>Шапка</span>
					</label>
					<input
						className={styles.builder__componentInput}
						id='1234'
						type='radio'
						name='components'
						checked={valueRadio === 'footersList'}
						onClick={e => onToggleValue(e, 'footersList')}
					/>
					<label className={styles.builder__componentLabel} htmlFor='1234'>
						<img
							className={styles.builder__componentImg}
							src={iconFooter}
							alt='icon footer'
						/>
						<span className={styles.builder__componentTitle}>Подвал</span>
					</label>
				</aside>
				<DndContext onDragEnd={handelDragEnd}>
					<div className={styles.builder__site}>
						<ComponentsModal componentsList={selectedComponent} />
						<SortableContext items={listBlock}>
							{listBlock.map(({ id, style_id, text, image_id }) => (
								<BlockSiteItem
									id={id}
									style_id={style_id}
									text={text}
									image_id={image_id}
								/>
							))}
						</SortableContext>
					</div>
				</DndContext>
				<aside className={styles.builder__settingsList}></aside>
			</div>
		</div>
	)
}

/* const PagesSite = () => {
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
		axios('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				setDataTable(response.data)
			})
			.catch(error => console.log(`setDataTable`, error))
	}, [])

	const columns = [
		{ heading: 'Cтраница', value: 'id' },
		{ heading: 'Отображение', value: 'name' },
		{ heading: 'Статус', value: 'username' },
		
	]

	return (
		<>
			<section className={cabinetStyles.personalCabinet + ` container`}>
				<Sidebar />
				<Table data={dataTable} columns={columns} styles={stylesTable} />
			</section>
		</>
	)
} */

export default PagesSite
