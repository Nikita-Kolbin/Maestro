import { $authHost, $host } from '.'

export const ordersСreateAPI = async data => {
	const response = await $authHost.post('api/order/make', data)
	return response
}

export const getOrdersAPI = async () => {
	const response = await $authHost.get(`api/order/get-all`)
	return response
}
