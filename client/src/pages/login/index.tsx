import React, { useState } from 'react'

export default function Login() {
    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={username} onChange={(e) => setUserName(e.target.value)}></input>
                <br></br>
                <br></br>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                <br></br>
                <button type="submit">Login</button>
            </form>

        </div>
    )
}
