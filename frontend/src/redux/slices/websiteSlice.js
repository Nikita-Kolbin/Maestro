import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSiteAPI, getSiteAPI } from '../../http/websiteAPI'

const initialState = {
    nameSite: null,
    idSite: null,
	listBlocks: [],
	isLoading: null,
}

const createSite = createAsyncThunk('product/getSite', async (_, thunkAPI) => {
	try {
		const res = await createSiteAPI(nameWebsite)
		return res
	} catch (err) {
		alert(err)
		console.log(err)
		return thunkAPI.rejectWithValue(err)
	}
})
const getSite = createAsyncThunk('product/getSite', async (_, thunkAPI) => {
	try {
		const res = await getSiteAPI()
		return res
	} catch (err) {
		alert(err)
		console.log(err)
		return thunkAPI.rejectWithValue(err)
	}
})

const productsSlice = createSlice({
	name: 'products',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getSite.pending, state => {
				state.status = 'loading'
			})
			.addCase(getSite.fulfilled, (state, action) => {
				state.nameSite = action.payload.alias
				state.idSite = action.payload.id
				state.list = [1]
				state.status = 'resolved'
			})
			.addCase(getSite.rejected, state => {
				state.status = 'rejected'
				state.isAuth = false
			})
	},
})

export default productsSlice.reducer
