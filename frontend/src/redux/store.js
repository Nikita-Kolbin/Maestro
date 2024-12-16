import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import siteReducer from './slices/websiteSlice'
import productsReducer from './slices/productsSlice'
import categoryReducer from './slices/categorySlice'
import ordersReducer from './slices/ordersSlice'
import selectReducer from './slices/selectSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		site: siteReducer,
		products: productsReducer,
		category: categoryReducer,
		orders: ordersReducer,
		select: selectReducer,
	},
})
