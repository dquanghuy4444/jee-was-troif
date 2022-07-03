import axios from "axios"
import { ENV_API_URL } from "configs/env"
import { PAGE_ROUTER_LOGIN, PAGE_ROUTER_NOT_FOUND } from "configs/router"
import { toastify } from "utils/toastify"

const instance = axios.create({
	baseURL: ENV_API_URL,
	timeout: 6000
})

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token")
		if (token) {
			config.headers["x-auth-token"] = token
		}
		return config
	},
	(error) => Promise.reject(error)
)

instance.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		console.log(error)
		if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
			toastify("error", "Hệ thống không hoạt động . Xin liên hệ với phòng IT")
			return null
		}

		const { data } = error.response

		const { statusCode } = data?.error

		if (statusCode === 401) {
			toastify("error", "Lỗi đăng nhập . Xin đăng nhập lại")
			window.location.replace(PAGE_ROUTER_LOGIN)
		} else if (statusCode === 500) {
			window.location.replace(PAGE_ROUTER_NOT_FOUND)
		}

		return data
	}
)

export { instance }
