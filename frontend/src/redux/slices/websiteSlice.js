import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSiteAPI, getSiteAPI } from '../../http/websiteAPI'

const initialState = {
	nameSite: null,
	idSite: null,
	active: null,
	listBlocks: [],
	status: null,
}

const createSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
	try {
		const res = await createSiteAPI()

		return res
	} catch (err) {
		return thunkAPI.rejectWithValue(err)
	}
})
export const getSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
	try {
		const { data } = await getSiteAPI()

		return data
	} catch (err) {
		return thunkAPI.rejectWithValue(err)
	}
})

const websiteSlice = createSlice({
	name: 'site',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getSite.pending, state => {
				state.status = 'loading'
			})
			.addCase(getSite.fulfilled, (state, action) => {
				state.nameSite = action.payload.alias
				state.idSite = action.payload.id
				state.active = action.payload.active
				state.listBlocks = [1]
				state.status = 'resolved'
			})
			.addCase(getSite.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export const getTitle = state => state.nameSite

export default websiteSlice.reducer
