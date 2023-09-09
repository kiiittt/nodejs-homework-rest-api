const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { loginSchema } = require("../../schemas/auth");
const bcrypt = require("bcrypt");
const user = require("../../models/user");

async function login(req, res, next) {
  const response = loginSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: response.error.details[0].message });
  }

  if (!user.verify) {
    return res.status(401).json({message: "Your email not verified"})
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = login;
