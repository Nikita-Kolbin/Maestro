import React from 'react'

import Header1 from '../sections/Headers/Header1'
import Header2 from '../sections/Headers/Header2'
import Nav1 from '../sections/Navbar/Nav1'

import Catalog1 from '../sections/Catalog/Catalog1'
import Catalog2 from '../sections/Catalog/Catalog2'

import Footer1 from '../sections/Footers/Footer1'

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
		
		case 5: {
			return <Catalog1 />
		}
		case 6: {
			return <Catalog2 />
		}
		case 11:
			return <Footer1 />

		default: {
			break
		}
	}
}

export default InterfaceSite
