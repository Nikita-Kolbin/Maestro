import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOrdersAPI } from '../../http/ordersAPI'

const initialState = {
	ordersList: [],
	status: null,
}

export const getOrders = createAsyncThunk(
	'product/getOrders',
	async (_, thunkAPI) => {
		try {
			const { data } = await getOrdersAPI()

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
			.addCase(getOrders.pending, state => {
				state.status = 'loading'
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.ordersList = action.payload
				state.status = 'resolved'
			})
			.addCase(getOrders.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default ordersSlice.reducer
