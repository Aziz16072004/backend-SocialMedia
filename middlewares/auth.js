const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log('Token from cookies:', token);

    if (token) {
        jwt.verify(token, 'aziz secret code', (err, decodedToken) => {
            if (err) {
                // console.log('JWT Verify Error:', err.message);
                return res.redirect('/auth/login')
            } else {
                // console.log('Decoded Token:', decodedToken);
                req.user = decodedToken;
                next();
            }
        });
    } else {
        // console.log('Unauthorized, no token found');
        return res.status(401).json({ message: 'Unauthorized, no token found' });
    }
};

module.exports = { requireAuth };
