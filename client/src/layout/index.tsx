import { API_PATH_VERIFY_USER } from "configs/api-path"
import { PAGE_ROUTER_LOGIN } from "configs/router"
import { fetchData } from "helpers"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { IUserResponse } from "types/resources/user"

export default function Layout({ children }) {
    let navigate = useNavigate()

    const [user, setUser] = useState<IUserResponse>(null)

    useEffect(() => {
        const verifyAccess = async () => {
            const res = await fetchData<IUserResponse>(API_PATH_VERIFY_USER)
            if (res.success) {
                setUser(res.payload)
                return
            }
            navigate(PAGE_ROUTER_LOGIN)
        }

        verifyAccess()
    }, [])

    if (!user) {
        return (
            <main className="">
                {children}
            </main>
        )
    }

    return <Outlet />
}
