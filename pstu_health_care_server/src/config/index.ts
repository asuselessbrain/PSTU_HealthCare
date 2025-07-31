import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') })

export const config = {
    develop_env: process.env.DEVELOPMENT_ENV,
    port: process.env.PORT,
    salt_rounds: process.env.SALT_ROUNDS,
    reset_password_frontend_link: process.env.RESET_PASSWORD_FRONTEND_LINK,
    jwt: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRE_IN,
        rest_password_token_secret: process.env.REST_PASSWORD_TOKEN_SECRET,
        rest_password_token_expire_in: process.env.REST_PASSWORD_TOKEN_EXPIRE_IN
    }
}