// Middleware
import jwt from 'jsonwebtoken';

const fetchUser = (req, res, next) => {
    const AuthenticationToken = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!AuthenticationToken) {
        return res.status(401).json({ error: 'Access Denied. Authentication Token not found!.💀' });
    }

    try {
        const decoded = jwt.verify(AuthenticationToken, process.env.JWT_SECRET)
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Authentication Token" });

    }
};

export default fetchUser;