import asyncHandler from '../Utils/AsyncHandler.js';
import { User } from '../Models/user.model.js';
import ApiError from '../Utils/ApiError.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Email from '../Utils/Email.js'; // Assuming you have a utility function to send emails
import { ResetToken } from '../Models/ResetToken.model.js';
import { Order } from '../Models/Order.model.js'
import sendOrderConfirmationEmail from '../Utils/senEmailConfirmation.js';

/*---------------------
  Sign Up
----------------------*/

const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate username
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters." });
        }

        // Validate username symbols
        if (!/^[a-zA-Z0-9.\-_!]+$/.test(username)) {
            return res.status(400).json({ message: "Username contains invalid characters." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address." });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }

        // Check if user already exists
        const userExist = await User.findOne({ $or: [{ username }, { email }] });
        if (userExist) {
            let errorMessage = userExist.username === username ? "Username already exists" : "Email already exists";
            return res.status(400).json({ message: errorMessage });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Create JWT token
        const data = {
            user: {
                id: user._id,
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send success response
        return res.status(201).json({ message: "Account created successfully", authToken, success: true });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong, User registration failed', success: false });
    }
});

/*---------------------
  Sign In
----------------------*/

const signinUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate password
    if (password.length < 8) {
        return res.status(400).json({ message: "Please Enter correct password." });
    }

    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Please enter correct password." });
        }
        const data = {
            user: {
                id: userExist._id,
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({ message: "Logged in successfully", authToken, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong, Signin failed", success: false });
    }
});

// FetchUser data

const fetchUser = asyncHandler(async (req, res) => {
    const userID = req.user && req.user.id ? req.user.id : req.params.id;

    try {
        if (!userID) {
            throw new ApiError(400, 'Something went wrong!');
        }

        const user = await User.findById(userID).select('-password');

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong, Server error", success: false });
    }
});

/*---------------------
  Delete User From DB
-----------------------*/

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, message: 'User deleted Successfully', user });
});

/*---------------------
  Forgot Password
----------------------*/

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, msg: "Email doesn't exist" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save the token and user's email to the database
    await ResetToken.findOneAndUpdate(
        { email },
        { userId: user._id, token: resetToken, email: email },
        { upsert: true }
    );

    // Create the reset URL
    const resetURL = `http://localhost:5173/r353t9455/${user._id}/${resetToken}`;

    // Send the reset link via email
    await Email(user.username, email, resetURL);

    res.status(200).json({ success: true, msg: "Reset link sent to email" });
});

/*---------------------
  Reset Password
-----------------------*/
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Validate newPassword

    const resetToken = await ResetToken.findOne({ token });

    if (!resetToken) {
        return res.status(400).json({ success: false, msg: 'Invalid or expired token' });
    }

    // Check click count
    if (resetToken.clicks >= resetToken.maxClicks) {
        await resetToken.delete();
        return res.status(400).json({ success: false, msg: 'Token has been clicked too many times' });
    }

    // Increment click count
    resetToken.clicks += 1;
    await resetToken.save();

    // Find user by userId instead of email
    const user = await User.findById(resetToken.userId);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    // Remove the token after successful password reset
    await resetToken.deleteOne();

    res.status(200).json({ success: true, msg: 'Password reset successfully' });
});

/*---------------------
  CheckOut Order
-----------------------*/

const saveCheckoutData = async (req, res) => {
    try {
        const { billingDetails, shippingDetails, paymentMethod, cartlist, subtotal, shipping, discount, total } = req.body;

        // Validate payload
        if (!billingDetails || !shippingDetails || !paymentMethod || !cartlist || !subtotal || !shipping || !discount || !total) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Assuming userId is available in req.params.userId
        const userId = req.params.userId;
        
        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const email = user.email;
        const username = user.username;

        // Create the order
        const order = new Order({
            userId: userId,
            billingDetails,
            shippingDetails,
            paymentMethod,
            cartlist,
            subtotal: parseFloat(subtotal),
            shipping: parseFloat(shipping),
            discount: parseFloat(discount),
            total: parseFloat(total),
        });

        // Save order to database
        await order.save();

        // Send order confirmation email
        await sendOrderConfirmationEmail(email, username, order);

        // Respond with success
        res.status(201).json({ message: "Checkout successful" });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Order for a user

const getMyOrders = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Verify the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find all orders associated with the user
        const orders = await Order.find({ userId });

        res.json({ orders });
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export {
    signupUser,
    signinUser,
    fetchUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    saveCheckoutData,
    getMyOrders
};
