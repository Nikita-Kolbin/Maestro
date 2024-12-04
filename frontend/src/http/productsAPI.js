import { $authHost, $host } from '.'

export const uploadImageAPI = async data => {
	const idList = []
	for (let i = 0; i < data.length; i++) {
		const { id } = await $host.post('api/file/upload-image', {
			data,
		})
		idList.push(id)
	}

	return idList
}

export const productСreateAPI = async data => {
	const response = await $authHost.post('api/product/create', {
		data,
	})
	return response
}

export const editProductAPI = async data => {
	const response = await $authHost.post('api/product/update', {
		data,
	})
	return response
}

export const getProductsAPI = async nameWebsite => {
	const response = await $host.post(
		`api/product/get-active-by-alias?alias=${nameWebsite}`
	)
	return response
}
