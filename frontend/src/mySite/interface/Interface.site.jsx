import React from 'react'

import Header1 from '../sections/Headers/Header1'
import Header2 from '../sections/Headers/Header2'
import Footer1 from '../sections/Footers/Footer1'
import Main1 from '../sections/Main/Main1'
import Main2 from '../sections/Main/Main2'

const InterfaceSite = ({ id , text = '', imageSrc = '' }) => {

	switch (id) {
		case 10: {
			return <Header1 text={text} />
		}
		case 1.2: {
			return <Header2 />
		}
		case 2: {
			return <Main1 />
		}
		case 3: {
			return <Main2 />
		}
		case 1:
			return <Footer1 />

		default: {
			break
		}
	}
}

export default InterfaceSite
