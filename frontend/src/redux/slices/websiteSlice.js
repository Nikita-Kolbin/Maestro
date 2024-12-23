import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	createSiteAPI,
	getSiteAPI,
	getStyleSiteAPI,
	setStyleSiteAPI,
} from '../../http/websiteAPI'

const initialState = {
	nameSite: null,
	idSite: null,
	active: null,
	listBlocks: [],
	status: null,
}

const createSite = createAsyncThunk('site/createSite', async (_, thunkAPI) => {
	try {
		const res = await createSiteAPI()
		return res
	} catch (err) {
		return thunkAPI.rejectWithValue(err)
	}
})

export const getStyleSite = createAsyncThunk(
	'site/getStyleSite',
	async (nameSite, thunkAPI) => {
		try {
			const { data } = await getStyleSiteAPI(nameSite)
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const setStyleSite = createAsyncThunk(
	'site/setStyleSite',
	async (data, thunkAPI) => {
		try {
			const res = await setStyleSiteAPI(data)
			await thunkAPI.dispatch(getStyleSite(data.website_alias))
			return res
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
	try {
		const { data } = await getSiteAPI()

		await thunkAPI.dispatch(getStyleSite(data.alias))

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
				localStorage.setItem('nameSite', action.payload.alias)

				state.idSite = action.payload.id
				state.active = action.payload.active

				state.status = 'resolved'
			})
			.addCase(getSite.rejected, state => {
				state.status = 'rejected'
			})

			.addCase(getStyleSite.pending, state => {
				state.status = 'loading'
			})
			.addCase(getStyleSite.fulfilled, (state, action) => {
				state.listBlocks = action.payload.sections
				state.status = 'resolved'
			})
			.addCase(getStyleSite.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export const getTitle = state => state.nameSite

export default websiteSlice.reducer
