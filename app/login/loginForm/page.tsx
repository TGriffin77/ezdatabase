'use client'
import { FormEvent, useState, ChangeEvent } from 'react'

async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const host = formData.get('host')
    const user = formData.get('user')
    const port = formData.get('port') ? formData.get('port') : '3306'
    const password = formData.get('password')
    const database = formData.get('database')

    console.log(JSON.stringify({ host, user, port, password, database }))

    const response = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ host, user, port, password, database})
    })
    if (response.ok){
        // push to interface
    }
    else{
        // Handle error
    }
}

export default function LoginForm(){
    const [formValues, setFormvalues] = useState({
        user: '',
        host: '',
        port: '',
        password: '',
        database: ''
    })

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormvalues((e) => ({
            ...e,
            [name]: value
        }))
    }

    const isFormValid = (): boolean => {
        if(!(formValues.user && formValues.host && formValues.password)){
            return true
        }
        return false
    }

    return(
        <div className="absolute flex h-screen w-screen top-0">
            <form onSubmit={handleSubmit} className="flex flex-grow flex-col items-center justify-center">
                <p className="text-xl">Connect to MariaDB Server</p>
                
                <label className="input w-64 input-bordered flex items-center gap-2 m-1">
                    Host
                    <input type="host" name="host" placeholder="127.0.0.1" className="grow" value={formValues.host} onChange={handleInputChange} required />
                </label>
                <label className="input w-64 input-bordered flex items-center gap-2 m-1">
                    Port
                    <input type="port" name="port" placeholder="default: 3306" className="grow" value={formValues.port} onChange={handleInputChange} />
                </label>
                <label className="input w-64 input-bordered flex items-center gap-2 m-1">
                    User
                    <input type="user" name="user" placeholder="root" className="grow" value={formValues.user} onChange={handleInputChange} required />
                </label>
                <label className="input w-64 input-bordered flex items-center gap-2 m-1">
                    Password
                    <input type="password" name="password" placeholder="" className="grow" value={formValues.password} onChange={handleInputChange} required />
                </label>
                <label className="input w-64 input-bordered flex items-center gap-2 m-1">
                    Database
                    <input type="database" name="database" placeholder="(optional)" className="grow" value={formValues.database} onChange={handleInputChange} />
                </label>
                <button type="submit" className='btn btn-wide btn-primary m-2' disabled={isFormValid()}>Connect</button>
            </form>
        </div>
    )
    
}