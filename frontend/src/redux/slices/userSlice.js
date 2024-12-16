import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { $host } from '../../http'
import { jwtDecode } from 'jwt-decode'

const initialState = {
	email: localStorage?.getItem('email'),
	phone: '+79222587852',
	token: localStorage?.getItem('token'),
	id: localStorage.getItem('token')
		? jwtDecode(localStorage?.getItem('token')).id
		: null,
	status: localStorage.getItem('token') ? 'resolved' : null,
	error: null,
	isAuth: !!localStorage?.getItem('email'),
}

export const registration = createAsyncThunk(
	'user/registration',
	async ({ email, password }, thunkAPI) => {
		try {
			const { data } = await $host.post('api/admin/sign-up', {
				email,
				password,
			})
			return data
		} catch (err) {
			alert(err.response.data.error)
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const login = createAsyncThunk(
	'admin/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const { data } = await $host.post('api/admin/sign-in', {
				email,
				password,
			})
			return data
		} catch (err) {
			alert(err.response.data.error)
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const userSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		/* setUser(state, action) {
			state.email = action.payload.email
			state.token = action.payload.token
			state.id = action.payload.id
		}, */
		removeUser(state) {
			state.email = null
			/* state.phone = null */ // todo phone from back
			state.token = null
			state.id = null
			state.status = null
			state.error = null
			state.isAuth = false

			localStorage.removeItem('token')
			localStorage.removeItem('email')
			/* localStorage.removeItem('token') */
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registration.pending, state => {
				state.status = 'loading'
				state.isAuth = false
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.id = jwtDecode(action.payload.token).id
				state.isAuth = true

				state.email = action.meta.arg.email
				localStorage.setItem('email', action.meta.arg.email)

				state.token = action.payload.token
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(registration.rejected, (state, action) => {
				state.status = 'rejected'
				state.isAuth = false
			})
			.addCase(login.pending, state => {
				state.status = 'loading'
				state.isAuth = false
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.id = jwtDecode(action.payload.token).id

				state.email = action.meta.arg.email
				localStorage.setItem('email', action.meta.arg.email)

				state.token = action.payload.token
				localStorage.setItem('token', action.payload.token)

				state.isAuth = true
			})
			.addCase(login.rejected, state => {
				state.status = 'rejected'
				state.isAuth = false
			})
	},
})

export const { removeUser } = userSlice.actions

export default userSlice.reducer
