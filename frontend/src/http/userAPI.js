import { $authHost, $host } from '.'


/* export const registr = async (email, password) => {
	const { data } = await $host.post('api/admin/sign-up', { email, password })
	localStorage.setItem(data)
	return data.token
} */

/* export const login = async (email, password) => {
	const { data } = await $host.post('api/admin/sign-in', { email, password })
	localStorage.setItem(data)
	return data.token
} */

export const check = async () => {
	// const response = await $authHost.post('api/admin/auth')  //todo authAPI for check auth
	return !!localStorage.getItem('token')
}
