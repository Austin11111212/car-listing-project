const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Retrieve the 'Authorization' header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid tokens
        return res.status(400).json({ message: 'Invalid token.' });
    }
};
