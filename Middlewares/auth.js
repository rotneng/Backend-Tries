const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const user = jwt.verify(token, "qwerty"); 
      req.user = user; 
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.isAdmin)) {
    next();
  } else {
    return res.status(403).json({ message: "Admin resource. Access denied." });
  }
};