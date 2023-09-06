const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string") {
    return res.status(401).json({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decode) => {
    if (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ message: "Not authorized" });
      }
      return next(err);
    }

    try {
      const user = await User.findById(decode.id);
      if (!user || user.token !== token) {
        return res.status(401).json({ message: "Not authorized" });
      }
      req.user = { _id: decode.id };
      next();
    } catch (error) {
      next(err);
    }
  });
}

module.exports = auth;
