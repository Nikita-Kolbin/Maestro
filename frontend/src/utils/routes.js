import Analytics from '../components/Analytics/Analytics'
import Auth from '../components/Auth/Auth'
import Cabinet from '../components/Cabinet/Cabinet'
import Clients from '../components/Clients/Clients'
import MenuPage from '../components/MenuPage/MenuPage'
import Orders from '../components/Orders/Orders'
import PagesSite from '../components/PagesSite/PagesSite'
import Products from '../components/Products/Products'
import ThemePage from '../components/ThemePage/ThemePage'
import MySite from '../mySite/MySite'

const nameSite = localStorage.getItem('nameSite')

export const ROUTES = {
	HOME: '/',
	SIGNUP: '/admin/sign-up',
	SIGNIN: '/admin/sign-in',
	CABINET: '/admin/cabinet',
	CABINETEDIT: '/admin/cabinet-edit',
	ORDERS: '/admin/orders',
	PRODUCTS: '/admin/products',
	CLIENTS: '/admin/clients',
	ANALYTICS: '/admin/analytics',
	THEME: '/admin/theme',
	PAGESSITE: '/admin/pages',
	MENU: '/admin/menu',
}

export const ROUTESITE = {
	...(nameSite ? { MYSITE: `/site/${nameSite}` } : {}),
}

export const authRoutes = [
	{
		path: ROUTES.CABINET,
		Component: Cabinet,
	},

	{
		path: ROUTES.ORDERS,
		Component: Orders,
	},
	{
		path: ROUTES.PRODUCTS,
		Component: Products,
	},
	{
		path: ROUTES.CLIENTS,
		Component: Clients,
	},
	{
		path: ROUTES.ANALYTICS,
		Component: Analytics,
	},
	{
		path: ROUTES.THEME,
		Component: ThemePage,
	},
	{
		path: ROUTES.PAGESSITE,
		Component: PagesSite,
	},
	{
		path: ROUTES.MENU,
		Component: MenuPage,
	},
]
export const publicRoutes = [
	{
		path: ROUTES.SIGNIN,
		Component: Auth,
	},
	{
		path: ROUTES.SIGNUP,
		Component: Auth,
	},
	{
		path: ROUTESITE.MYSITE,
		Component: MySite,
	},
]
