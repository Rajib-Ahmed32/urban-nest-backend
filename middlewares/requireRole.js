const User = require("../models/User");

const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    const email = req.user?.email;
    if (!email)
      return res.status(401).json({ message: "Unauthorized: No email" });

    const dbUser = await User.findOne({ email });
    if (!dbUser) return res.status(404).json({ message: "User not found" });

    if (dbUser.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient role" });
    }

    req.user.role = dbUser.role;
    next();
  };
};

module.exports = requireRole;
