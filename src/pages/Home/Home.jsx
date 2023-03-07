import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Welcome to Revitionary!</h1>

            <form>
                <Link to='/login'><button>Login</button></Link>
            </form>
        </div>
    )
}
