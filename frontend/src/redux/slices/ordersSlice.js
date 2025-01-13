import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	orderСreateAPI,
	getOrdersAPI,
	getOrdersCustomerAPI,
} from '../../http/ordersAPI'

const initialState = {
	ordersListAdmin: [],
	ordersListCustomer: [],
	status: null,
}

export const getOrdersAdmin = createAsyncThunk(
	'orders/getOrdersAdmin',
	async (_, thunkAPI) => {
		try {
			const { data } = await getOrdersAPI()
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getOrdersCustomer = createAsyncThunk(
	'orders/getOrdersCustomer',
	async (_, thunkAPI) => {
		try {
			const { data } = await getOrdersCustomerAPI()
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const orderСreate = createAsyncThunk(
	'orders/orderСreate',
	async (comment, thunkAPI) => {
		try {
			const { data } = await orderСreateAPI(comment)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const ordersSlice = createSlice({
	name: 'orders',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getOrdersAdmin.pending, state => {
				state.status = 'loading'
			})
			.addCase(getOrdersAdmin.fulfilled, (state, action) => {
				state.ordersListAdmin = action.payload
				state.status = 'resolved'
			})
			.addCase(getOrdersAdmin.rejected, state => {
				state.status = 'rejected'
			})
			.addCase(getOrdersCustomer.pending, state => {
				state.status = 'loading'
			})
			.addCase(getOrdersCustomer.fulfilled, (state, action) => {
				state.ordersListCustomer = action.payload
				state.status = 'resolved'
			})
			.addCase(getOrdersCustomer.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default ordersSlice.reducer
