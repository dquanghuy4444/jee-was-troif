import { instance } from "./config"

class MyResponse<T> {
	payload?: T
	error?: string
	success: boolean

	constructor(res: any) {
		this.success = res?.success || false

		if (res?.payload) {
			this.payload = res.payload
		}
		if (res?.error) {
			this.error = Array.isArray(res.error.message) ? res.error.message[0] : res.error.message
		}
	}
}

const generateQueryString = (path: string, data?: any) => {
	if (data) {
		const qs = Object.keys(data)
			.map((key) => `${key}=${data[key]}`)
			.join("&")

		return path + `?${qs}`
	}

	return path
}

export const fetchData = async <R>(path: string, data?: any): Promise<MyResponse<R>> => {
	const qs = generateQueryString(path, data)

	const res = await instance.get<any, R>(qs)

	return new MyResponse<R>(res)
}

export const postData = async <T, R>(path: string, data: T): Promise<MyResponse<R>> => {
	const res = await instance.post<T, R>(path, data)

	return new MyResponse<R>(res)
}

export const putData = async <T, R>(path: string, id: string, data: T): Promise<MyResponse<R>> => {
	const res = await instance.put(path + "/" + id, data)

	return new MyResponse<R>(res)
}

export const deleteData = async (path: string, id: string): Promise<MyResponse<any>> => {
	const res = await instance.delete(path + "/" + id)

	return new MyResponse<any>(res)
}
