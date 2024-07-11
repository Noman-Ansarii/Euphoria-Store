import nodemailer from 'nodemailer';

const sendOrderConfirmationEmail = async (email, username, orderDetails) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USER, // your email
            pass: process.env.PASS, // your password
        },
    });

    const mailOptions = {
        from: {
            name: "Euphoria Store",
            address: process.env.USER, // your email
        },
        to: email,
        subject: 'Order Confirmation',
        html: `
            <body style="background: linear-gradient(to bottom right, #87CEEB, #FFC0CB, #E6E6FA);">
            <div style="padding: 30px;">
            <h1>Order Confirmation</h1>
            <p>Hi ${username},</p>
            <p>Your order has been placed successfully.</p>
            <h2>Order Details:</h2>
            <pre>${formatOrderDetails(orderDetails)}</pre>
            </div>
            </body>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};

const formatOrderDetails = (orderDetails) => {
    // Extract only necessary order details for email
    const { cartlist, subtotal, shipping, discount, total } = orderDetails;
    return `
        <b>Cart Items:</b>
        <ul>
            ${cartlist.map(item => `<li>${item.description} - ${item.price}</li>`).join('')}
        </ul>
        <p><b>Subtotal:</b> ${subtotal}</p>
        <p><b>Shipping:</b> ${shipping}</p>
        <p><b>Discount:</b> ${discount}</p>
        <p><b>Total:</b> ${total}</p>
    `;
};

export default sendOrderConfirmationEmail;
