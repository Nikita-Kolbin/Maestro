import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { $host } from '../../http'
import { getProductsAPI } from '../../http/productsAPI'

const initialState = {
	productsList: [],
	status: null,
}

/* const getSiteName = () => {
	const { nameSite } = useSelector(state => state.site)
	console.log(nameSite);
	
	return nameSite
} */

export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (nameSite, thunkAPI) => {
		try {
			const { data } = await getProductsAPI(nameSite)

			/* console.log(2);
			console.log(data); */

			return data
		} catch (err) {
			alert(err.response.data.error)
			console.log(err)
			console.log(1)
			console.log()
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

export const { setActual } = productsSlice.actions

export default productsSlice.reducer
