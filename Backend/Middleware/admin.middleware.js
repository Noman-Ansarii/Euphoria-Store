// middleware/checkAdmin.js
import jwt from 'jsonwebtoken';
import { User } from '../Models/user.model.js';
import ApiError from '../Utils/ApiError.js';

const checkAdmin = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user || user.role !== 'admin') {
            throw new ApiError(403, 'Access denied');
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Access denied', success: false });
    }
};

export default checkAdmin;
