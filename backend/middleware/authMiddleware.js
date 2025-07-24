// backend/middleware/authMiddleware.js
// Import jsonwebtoken using ES module syntax
import jwt from 'jsonwebtoken';

// Define the middleware function
const authenticateToken = (req, res, next) => {
    // Get the JWT from the 'Authorization' header (e.g., "Bearer YOUR_TOKEN_HERE")
    const authHeader = req.headers['authorization'];
    // Split "Bearer TOKEN" into ["Bearer", "TOKEN"] and take the second element
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided
    if (token == null) {
        return res.status(401).json({ message: 'Authentication token required.' }); // 401 Unauthorized
    }

    // Verify the token. Use a try-catch for synchronous jwt.verify
    try {
        // process.env.JWT_SECRET_KEY must be loaded via dotenv in your main app file (index.js/app.js)
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // If token is valid, attach user info (from token payload) to the request object
        // This makes userId and username available in subsequent route handlers
        req.userId = user.userId;
        req.username = user.username;

        next(); // Proceed to the next middleware or the actual route handler

    } catch (err) {
        // Token is invalid (e.g., malformed, expired, wrong signature)
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token.' }); // 403 Forbidden
    }
};

// Export the middleware function using ES module syntax
export default authenticateToken;