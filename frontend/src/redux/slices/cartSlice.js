import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addProductAPI, getCartAPI } from '../../http/cartAPI'

const initialState = {
	productsList: [],
	status: null,
}

export const getCartProducts = createAsyncThunk(
	'cart/getCart',
	async (_, thunkAPI) => {
		try {
			const { data } = await getCartAPI()

			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const addProductToCart = createAsyncThunk(
	'cart/addProductToCart',
	async (data, thunkAPI) => {
		try {
			console.log(data)

			const { res } = await addProductAPI(data)
			await getCartAPI()
			return res
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const cartSlice = createSlice({
	name: 'cart',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getCartProducts.pending, state => {
				state.status = 'loading'
			})
			.addCase(getCartProducts.fulfilled, (state, action) => {
				state.productsList = action.payload.items
				state.status = 'resolved'
			})
			.addCase(getCartProducts.rejected, state => {
				state.status = 'rejected'
			})
			.addCase(addProductToCart.pending, state => {
				state.status = 'loading'
			})
			.addCase(addProductToCart.fulfilled, (state, action) => {
				state.status = 'resolved'
			})
			.addCase(addProductToCart.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default cartSlice.reducer
