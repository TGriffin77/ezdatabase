import mysql from 'mysql2/promise'

export async function POST(request: Request){
    const data = await request.json();

    const pool = mysql.createPool({
        host: data.host,
        user: data.user,
        port: data.port,
        password: data.password,
        database: data.database,
        waitForConnections: true
    })

    try{
        const db = await pool.getConnection();

        return Response.json({"status":"working"});
    }
    catch{
        return Response.json({"status":"failed"});
    }
}