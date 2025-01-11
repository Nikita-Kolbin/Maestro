import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

import BlockSiteItem from '../BlockSiteItem/BlockSiteItem'

const RenderSiteDnd = ({ listBlock, handelDragEnd, deleteBlockFromList }) => {
	return (
		<DndContext onDragEnd={handelDragEnd} modifiers={[restrictToVerticalAxis]}>
			<SortableContext items={listBlock}>
				{listBlock.map(({ id, style_id, text, image_id }) => (
					<BlockSiteItem
						id={id}
						style_id={style_id}
						text={text}
						image_id={image_id}
						key={id}
						deleteBlock={idBlock => deleteBlockFromList(idBlock)}
					/>
				))}
			</SortableContext>
		</DndContext>
	)
}

export default RenderSiteDnd
