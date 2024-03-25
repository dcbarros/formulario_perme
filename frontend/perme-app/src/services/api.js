import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

const throttle = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const formSendThrottleInMs = 500;

api.interceptors.request.use(async (config) => {
	if (['post', 'POST', 'put', 'PUT', 'patch', 'PATCH'].includes(config.method)) {
		await throttle(formSendThrottleInMs);
	}
	return config;
}, (error) => Promise.reject(error));

export default api;