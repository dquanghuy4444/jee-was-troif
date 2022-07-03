import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { Suspense } from "react"
import Layout from "layout"
import { PAGE_ROUTER_DASHBOARD, PAGE_ROUTER_LOGIN } from "configs/router"


const Dashboard = React.lazy(() => import("pages/dashboard"))

const Login = React.lazy(() => import("pages/login"))

const NotFound = React.lazy(() => import("pages/not-found"))

const LIST_ROUTES = [

    {
        ele: <Login />,
        hasLayout: false,
        path: PAGE_ROUTER_LOGIN
    },

    {
        ele: <Dashboard />,
        hasLayout: true,
        path: PAGE_ROUTER_DASHBOARD
    },

    {
        ele: <NotFound />,
        hasLayout: true,
        path: "*"
    }
]

export default function App() {
    return (
        <Suspense fallback={
            <p>Loading</p>
        }>
            <BrowserRouter>
                <Routes>
                    {LIST_ROUTES.map((ro, index) => (
                        <Route
                            element={ro.hasLayout ? <Layout>{ro.ele}</Layout> : ro.ele}
                            key={index}
                            path={ro.path}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}
