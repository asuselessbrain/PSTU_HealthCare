import nodemailer from "nodemailer";
import { config } from "../config";

const sendEmail = async (receiver: string, Subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.nodemailer.node_mailer_email,
            pass: config.nodemailer.node_mailer_password,
        },
    });


    const info = await transporter.sendMail({
        from: config.nodemailer.node_mailer_email,
        to: receiver,
        subject: Subject,
        html: html,
    });

    console.log("Message sent:", info.messageId);
}

export default sendEmail