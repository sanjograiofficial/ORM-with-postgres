import { Pool } from "pg";
import dotenv from 'dotenv/config'
let pool = new Pool({
    POSTGRES_USER=process.env.DB_USER,
    POSTGRES_DB= process.env.DB_NAME, 
    POSTGRES_PASSWORD= process.env.DB_PASSWORD, 
    POSTGRES_HOST= process.env.DB_HOST, 
    POSTGRES_PORT = process.env.DB_PORT
})

export default pool;