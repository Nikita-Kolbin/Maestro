import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import siteReducer from './slices/websiteSlice'
import productsReducer from './slices/productsSlice'
import categoryReducer from './slices/categorySlice'
import clientsReducer from './slices/clientsSlice'
import ordersReducer from './slices/ordersSlice'
import selectReducer from './slices/selectSlice'

import customerReducer from './slices/customerSlice'
import cartReducer from './slices/cartSlice'
import productsActiveReducer from './slices/productsActiveSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		site: siteReducer,
		clients: clientsReducer,
		products: productsReducer,
		category: categoryReducer,
		orders: ordersReducer,
		select: selectReducer,

		customer: customerReducer,
		cart: cartReducer,
		productsActive: productsActiveReducer,
	},
})
