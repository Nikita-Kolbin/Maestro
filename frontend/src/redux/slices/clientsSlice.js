import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getClientsAPI } from '../../http/clientsAPI'

const initialState = {
	clientsList: [],
	status: null,
}

export const getClients = createAsyncThunk(
	'clients/getClients',
	async (_, thunkAPI) => {
		try {
			const { data } = await getClientsAPI()
			return data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const clientsSlice = createSlice({
	name: 'orders',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(getClients.pending, state => {
				state.status = 'loading'
			})
			.addCase(getClients.fulfilled, (state, action) => {
				state.clientsList = action.payload
				state.status = 'resolved'
			})
			.addCase(getClients.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export default clientsSlice.reducer
