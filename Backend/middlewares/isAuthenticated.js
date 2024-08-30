import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // If token verification fails
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Store the user ID in the request object
    req.id = decoded.userId;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({
      message: "Server error during authentication",
      success: false,
    });
  }
};

export default isAuthenticated;
