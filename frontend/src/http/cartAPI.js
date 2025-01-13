import { $authCustomerHost } from '.'

export const addProductAPI = async ({ count, product_id }) => {
	const response = await $authCustomerHost.post('api/cart/add-product', {
		count: count,
		product_id: product_id,
	})
	return response
}

export const getCartAPI = async () => {
	const response = await $authCustomerHost.get(`api/cart/get`)
	return response
}
