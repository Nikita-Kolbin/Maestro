import { $authCustomerHost, $authHost } from '.'

export const orderСreateAPI = async data => {
	const response = await $authCustomerHost.post('api/order/make', {comment: data})
	return response
}

export const getOrdersAPI = async () => {
	const response = await $authHost.get(`api/order/get-all`)
	return response
}

export const getOrdersCustomerAPI = async () => {
	const response = await $authCustomerHost.get(`api/order/get-my`)
	return response
}
