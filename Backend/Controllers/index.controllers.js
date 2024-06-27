import asyncHandler from '../Utils/AsyncHandler.js';
import { User } from '../Models/user.model.js';
import ApiError from '../Utils/ApiError.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// assign_admin

const assignAdminRole = asyncHandler(async (req, res) => {
    const { userId, mainUsername, mainPassword } = req.body;

    // Ensure only admins can assign admin roles
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "You do not have permission to assign admin roles" });
    }

    // Verify main credentials
    if (mainUsername !== process.env.MAIN_USERNAME || mainPassword !== process.env.MAIN_PASSWORD) {
        return res.status(403).json({ message: "Invalid main credentials" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isAdmin = true;
        await user.save();

        res.status(200).json({ message: "User assigned as admin successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to assign admin role", success: false });
    }
});

export {
    signupUser,
    signinUser,
    fetchUser,
    deleteUser,
    assignAdminRole
};