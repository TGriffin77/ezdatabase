import LoginForm from './loginForm/page'
import Link from 'next/link'

export default function Page(){
    
    return (
        <>
            <div className="navbar bg-base-100 absolute">
                <Link className="btn btn-ghost text-xl" href="/">EZDatabase</Link>
            </div>
            <LoginForm />
        </>
        
    )
}

