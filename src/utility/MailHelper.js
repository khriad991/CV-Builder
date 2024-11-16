import nodemailer from 'nodemailer';

// Nodemailer helper function
export async function MailHelper({ to, text }) {
    try {
        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '992khriad@gmail.com',
                pass: '029101', // Use App Password for security
            },
        });

        // Mail options
        const mailOptions = {
            from: '"Your App Name" <9912hriad@gmail.com>',
            to,
            subject:"CV-Builder Reset password",
            text,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: `i m form node mail ------------------------->>> ${error.message}` };
    }
}

export default MailHelper;
