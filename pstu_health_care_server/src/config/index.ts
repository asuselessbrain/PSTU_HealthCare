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
    },
    nodemailer: {
        node_mailer_email: process.env.NODE_MAILER_EMAIL,
        node_mailer_password: process.env.NODE_MAILER_PASSWORD
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cloud_api_key: process.env.CLOUD_API_KEY,
        cloud_api_secret: process.env.CLOUD_API_SECRET,
    }
}