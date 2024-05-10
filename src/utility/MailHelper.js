import nodemailer from "nodemailer";

export async function MailHelper(EmailTo, EmailText, EmailSubject) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '992khriad@gmail.com',
            pass: 'hAsAn313393'
        }
    });

    let MailOption = {
        from: 'CV-Builder <992khriad@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };

    try {
        return await transporter.sendMail(MailOption);
    } catch (error) {
        console.error('Error sending email-------->>>>:', error);
    }
}

export default MailHelper;