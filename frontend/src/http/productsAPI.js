import { $authHost, $host } from '.'

export const uploadImageAPI = async img => {
	const { data } = await $host.post('api/file/upload-image', img, {
		headers: { 'Content-Type': ' multipart/form-data' },
	})
	return data
}

/* const getImageAPI = async id => {
	const { data } = await $host.get(`api/file/get-image/${id}`)
	console.log(data)

	return data
}

export const tryGetImage = id => {
	getImageAPI(id)
		.then(res => {
			return res
		})
		.catch(() => {
			return '../assets/images/no_image.png'
		})
}
 */

export const productСreateAPI = async data => {
	const idList = []
	for (let i = 0; i < data.file.length; i++) {
		const formData = new FormData()
		formData.append('image', data.file[i])

		await uploadImageAPI(formData)
			.then(({ id }) => {
				idList.push(id)
			})
			.catch(err => console.log(err))
	}

	data.price = Number(data.price)
	data.count = Number(data.count)
	data.tags = ['']
	data.image_ids = idList
	delete data.file
	delete data.categoryProduct // todo backend

	const response = await $authHost.post('api/product/create', data)
	return response
}

export const editProductAPI = async data => {
	const response = await $authHost.post('api/product/update', {
		data,
	})
	return response
}

export const getProductsAPI = async () => {
	const response = await $authHost.get(`api/product/get-all`)
	return response
}

export const getActiveProductsAPI = async alias => {
	const response = await $host.get(`api/product/get-active-by-alias`, {
		params: {
			alias: alias,
		},
	})
	return response
}

export const deleteProductAPI = async idProduct => {
	const response = await $authHost.delete(`api/product/delete`, {
		params: {
			id: idProduct,
		},
	})
	return response
}
