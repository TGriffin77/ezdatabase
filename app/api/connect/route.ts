import {NextRequest, NextResponse} from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(request: NextRequest){
    const data = await request.json()
    console.log(data)

    const pool = mysql.createPool({
        host: data.host,
        user: data.user,
        port: data.port,
        password: data.password,
        // database: data.database,
        waitForConnections: true
    })    

    try{
        const db = (await pool.getConnection()).ping()

        return NextResponse.json({message:"Authorized"}, {status:200})
    }
    catch{
        return NextResponse.json({message:"Unauthorized"}, {status:401})
    }
}