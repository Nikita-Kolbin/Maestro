import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	productsModal: null,
}

const selectSlice = createSlice({
	name: 'select',
	initialState,
	reducers: {
		productsModal(state, action) {
			state.productsModal = action.payload
		},
	},
})

export const { productsModal } = selectSlice.actions

export default selectSlice.reducer
