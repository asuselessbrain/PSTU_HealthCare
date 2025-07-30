import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') })

export const config = {
    develop_env: process.env.DEVELOPMENT_ENV,
    port: process.env.PORT,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRE_IN,
    }
}