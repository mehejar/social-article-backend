import dotenv from 'dotenv'
import path from 'path'


dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    data_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_ACCESS_SECRET
}