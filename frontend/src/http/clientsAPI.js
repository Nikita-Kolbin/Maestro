import { $authHost } from '.'

export const getClientsAPI = async () => {
	const response = await $authHost.get('api/customer/get-all')
	return response
}
