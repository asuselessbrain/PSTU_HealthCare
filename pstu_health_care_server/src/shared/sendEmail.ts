import nodemailer from "nodemailer";

const sendEmail = async (receiver: string, Subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ahmedshohagarfan@gmail.com",
            pass: "asurmrppdwizbhiw",
        },
    });


    const info = await transporter.sendMail({
        from: 'ahmedshohagarfan@gmail.com',
        to: receiver,
        subject: Subject,
        html: html,
    });

    console.log("Message sent:", info.messageId);
}

export default sendEmail