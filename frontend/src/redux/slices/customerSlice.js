import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { $authCustomerHost, $host } from '../../http'
import { jwtDecode } from 'jwt-decode'

const initialState = {
	email: localStorage?.getItem('emailCustomer'),
	phone: null,
	token: localStorage?.getItem('tokenCustomer'),
	id: localStorage.getItem('tokenCustomer')
		? jwtDecode(localStorage?.getItem('tokenCustomer')).id
		: null,
	status: localStorage.getItem('tokenCustomer') ? 'resolved' : null,
	error: null,
	isAuth: !!localStorage?.getItem('emailCustomer'),

	first_name: null,
	father_name: null,
	last_name: null,
	delivery_type: null,
	payment_type: null,
	telegram: null,
	email_notification: true,
	telegram_notification: true,
	website_alias: null,
}

export const registrationCustomer = createAsyncThunk(
	'customer/registration',
	async ({ alias, email, password }, thunkAPI) => {
		try {
			console.log(alias, email, password)
			const { data } = await $host.post('api/customer/sign-up', {
				alias,
				email,
				password,
			})

			return data
		} catch (err) {
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const loginCustomer = createAsyncThunk(
	'customer/login',
	async ({ alias, email, password }, thunkAPI) => {
		try {
			const { data } = await $host.post('api/customer/sign-in', {
				alias,
				email,
				password,
			})

			return data
		} catch (err) {
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getProfileCustomer = createAsyncThunk(
	'customer/get-my-profile',
	async (_, thunkAPI) => {
		try {
			const { data } = await $authCustomerHost.get(
				'api/customer/get-my-profile'
			)

			return data
		} catch (err) {
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const updateProfileCustomer = createAsyncThunk(
	'customer/update-profile',
	async (data, thunkAPI) => {
		try {
			const { res } = await $authCustomerHost.patch(
				'api/customer/update-profile',
				data
			)
			return res
		} catch (err) {
			console.log(err.response.data.error)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setSiteAlias(state, action) {
			state.website_alias = action.payload.alias
		},
		removeCustomer(state) {
			state.email = null
			state.phone = null
			state.token = null
			state.id = null
			state.status = null
			state.error = null
			state.isAuth = false

			state.father_name = null
			state.last_name = null
			state.delivery_type = null
			state.payment_type = null
			state.email_notification = false
			state.telegram_notification = false

			localStorage.removeItem('tokenCustomer')
			localStorage.removeItem('emailCustomer')
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registrationCustomer.pending, state => {
				state.status = 'loading'
				state.isAuth = false
			})
			.addCase(registrationCustomer.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.id = jwtDecode(action.payload.token).id
				state.isAuth = true

				state.email = action.meta.arg.email
				localStorage.setItem('emailCustomer', action.meta.arg.email)

				state.token = action.payload.token
				localStorage.setItem('tokenCustomer', action.payload.token)
			})
			.addCase(registrationCustomer.rejected, (state, action) => {
				state.status = 'rejected'
				state.isAuth = false
			})
			.addCase(loginCustomer.pending, state => {
				state.status = 'loading'
				state.isAuth = false
			})
			.addCase(loginCustomer.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.id = jwtDecode(action.payload.token).id

				state.email = action.meta.arg.email
				localStorage.setItem('emailCustomer', action.meta.arg.email)

				state.token = action.payload.token
				localStorage.setItem('tokenCustomer', action.payload.token)

				state.isAuth = true
			})
			.addCase(loginCustomer.rejected, state => {
				state.status = 'rejected'
				state.isAuth = false
			})
			.addCase(getProfileCustomer.pending, state => {
				state.status = 'loading'
			})
			.addCase(getProfileCustomer.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.first_name = action.payload.first_name
				state.phone = action.payload.phone
				state.last_name = action.payload.last_name
				state.father_name = action.payload.father_name
				state.delivery_type = action.payload.delivery_type
				state.payment_type = action.payload.payment_type
				state.telegram = action.payload.telegram
				state.email_notification = action.payload.email_notification
				state.telegram_notification = action.payload.telegram_notification
				state.website_alias = action.payload.website_alias
			})
			.addCase(getProfileCustomer.rejected, state => {
				state.status = 'rejected'
			})
	},
})

export const { setSiteAlias, removeCustomer } = customerSlice.actions

export default customerSlice.reducer
