import nodemailer from 'nodemailer';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const Email = async (username, email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: "Euphoria Store",
                address: process.env.USER,
            },
            to: email,
            subject: "Password Reset Code",
            html: `<p>
        Hi <b>${username}</b>,
        <br><br>
        We received a request to reset your Dev Account password for <b>${email}</b> through your email address. You requested a password reset. Please click the link below to reset your password:
        <br><br>
        <b>${resetURL}</b>
        <br>
        If you did not request this code, it is possible that someone else is trying to access the Dev Account <b>${email}</b>. Do not forward or give this code to anyone.
        <br><br>
        You received this message because this email address is listed as the recovery email for the Dev Account <b>${email}</b>. If that is incorrect, please click here to remove your email address from that Dev Account.
        <br><br>
        Sincerely yours,
        <br>
        The Dev Accounts team
        </p>`,
        });
        console.log("Email sent successfully: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

export default Email;
