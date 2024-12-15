import { $authHost, $host } from '.'

export const uploadImageAPI = async img => {
	const { data } = await $host.post(
		'api/file/upload-image',
		img,
		{
			headers: { 'Content-Type': ' multipart/form-data' },
		}
	)

	return data
}

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
	data.tags = ['']
	data.image_ids = idList
	delete data.file
	delete data.categoryProduct // todo backend
	delete data.countProduct // todo backend

	const response = await $authHost.post('api/product/create', data)
	return response
}

export const editProductAPI = async data => {
	const response = await $authHost.post('api/product/update', {
		data,
	})
	return response
}

export const getProductsAPI = async nameWebsite => {
	const response = await $host.get(
		`api/product/get-active-by-alias?alias=${nameWebsite}`
	)
	return response
}
