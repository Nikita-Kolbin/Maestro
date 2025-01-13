import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getActiveProductsAPI } from '../../http/productsAPI'

const initialState = {
	productsList: [],
	status: null,
}

export const getActiveProducts = createAsyncThunk(
	'product/getActiveProducts',
	async (alias, thunkAPI) => {
		try {
			const { data } = await getActiveProductsAPI(alias)

			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const activeProductsSlice = createSlice({
	name: 'products',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getActiveProducts.pending, state => {
				state.status = 'loading'
			})
			.addCase(getActiveProducts.fulfilled, (state, action) => {
				state.productsList = action.payload
				state.status = 'resolved'
			})
			.addCase(getActiveProducts.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default activeProductsSlice.reducer
