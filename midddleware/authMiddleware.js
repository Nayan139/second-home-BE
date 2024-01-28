import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  const SECRET = process.env.SECRET;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.replace("Bearer ", "");
    if (token == null)
      return res.status(401).json({ status: false, message: "Access denied" });
    jwt.verify(token, SECRET, (err, user) => {
      console.log(err);
      if (err)
        res.status(403).json({ status: false, message: "Invalid token" });

        req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid token" });
  }
};

export default AuthMiddleware;
