import { $host, $authHost } from '.'

export const createSiteAPI = async nameWebsite => {
	const response = await $authHost.post('api/website/create', {
		alias: nameWebsite,
	})
	return response
}

export const getSiteAPI = () => {
	return $authHost.get('api/website/get-my-website')
}

export const setStyleSiteAPI = async data => {
	const response = await $authHost.post('api/website/set-style', data)
	return response
}

export const getStyleSiteAPI = async nameWebsite => {
	const response = await $host.get('api/website/get-style', {
		params: {
			alias: nameWebsite,
		},
	})
	return response
}
