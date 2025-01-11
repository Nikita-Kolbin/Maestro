import React from 'react'

import Header1 from '../sections/Headers/Header1'
import Header2 from '../sections/Headers/Header2'
import Footer1 from '../sections/Footers/Footer1'
import Main1 from '../sections/Main/Main1'
import Main2 from '../sections/Main/Main2'
import Nav1 from '../sections/Navbar/Nav1'

const InterfaceSite = ({ id, text = '', imageSrc = '' }) => {
	switch (id) {
		case 1: {
			return <Header1 text={text} />
		}
		case 2: {
			return <Header2 text={text} />
		}
		case 4: {
			return <Nav1 />
		}
		case 10: {
			return <Main1 />
		}
		case 3: {
			return <Main2 />
		}
		case 11:
			return <Footer1 />

		default: {
			break
		}
	}
}

export default InterfaceSite
