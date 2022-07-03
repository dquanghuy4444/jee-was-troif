import { toast } from "react-toastify"

export const toastify = (
	kind: "info" | "success" | "warning" | "error" | "default",
	mess: string | undefined
) => {
	if (!mess) {
		return
	}
	toast[kind](mess)
}
