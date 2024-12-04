import { $authHost } from '.'

export const createSiteAPI = async nameWebsite => {
	const response = await $authHost.post('api/website/create', {
		nameWebsite,
	})
	return response
}

export const getSiteAPI = () => {
	return $authHost.get('api/website/get-my-website')
}
