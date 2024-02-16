import nodemailer from 'nodemailer';
import env from 'dotenv'
env.config()
export const transporter=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    }
)