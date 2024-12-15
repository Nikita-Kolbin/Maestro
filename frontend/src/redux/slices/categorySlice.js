import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryList: ['green', 'blue', 'red'],
}

/* const createSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
	try {
		const res = await createSiteAPI()

		return res
	} catch (err) {
		alert(err)
		console.log(err)
		return thunkAPI.rejectWithValue(err)
	}
})
export const getSite = createAsyncThunk('site/getSite', async (_, thunkAPI) => {
	try {
		const { data } = await getSiteAPI()
		console.log('getsite')
		console.log(data)

		return data
	} catch (err) {
		alert(err)
		console.log(err)
		return thunkAPI.rejectWithValue(err)
	}
}) */

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		addCategory(state, action) {
			state.categoryList = state.categoryList.push(action.payload)
		},
		deleteCategory(state, action) {
			const index = state.categoryList.findIndex(action.payload)
			if (index) {
				state.categoryList.splice(index, index)
			}
		},
	},

	/* extraReducers: builder => {
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
	}, */
})

export const { addCategory, deleteCategory } = categorySlice.actions

export default categorySlice.reducer
