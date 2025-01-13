import axios from 'axios'

const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

const $authHost = axios.create(
	{
		baseURL: process.env.REACT_APP_API_URL,
		headers: { 'X-Token': localStorage.getItem('token') },
	},
)

const $authCustomerHost = axios.create(
	{
		baseURL: process.env.REACT_APP_API_URL,
		headers: { 'X-Token': localStorage.getItem('tokenCustomer') },
	},
)

/* const authInterceptor = config => {
	config.headers['X-Token'] = localStorage.getItem('token')
	return config
}

$authHost.interceptors.request.use(authInterceptor)
 */
export { $host, $authHost, $authCustomerHost }
