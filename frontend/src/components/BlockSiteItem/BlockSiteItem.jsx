import React from 'react'
import InterfaceSite from '../../mySite/interface/Interface.site'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const BlockSiteItem = ({ id, style_id, text, image_id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<InterfaceSite id={style_id} text={text} imageSrc={image_id} />
		</div>
	)
}

export default BlockSiteItem
