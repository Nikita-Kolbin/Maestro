import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getProductsAPI } from '../../http/productsAPI'

const initialState = {
	productsList: [],
	status: null,
}

export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (_, thunkAPI) => {
		try {
			const { data } = await getProductsAPI()

			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	
	extraReducers: builder => {
		builder
			.addCase(getProducts.pending, state => {
				state.status = 'loading'
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.productsList = action.payload
				state.status = 'resolved'
			})
			.addCase(getProducts.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default productsSlice.reducer
