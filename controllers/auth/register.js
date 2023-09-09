const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { registerSchema } = require("../../schemas/auth");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");
const sendEmail = require("../../helpers");

require("dotenv").config();

const { BASE_URL } = process.env;

async function register(req, res, next) {
  const response = registerSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: response.error.details[0].message });
  }

  const { email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).json({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = randomUUID();

    const newUser = await User.create({
      email,
      password: passwordHash,
      subscription,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a
        target="_blank"
        href="${BASE_URL}/api/users/verify/${verificationToken}">
        Click here to verify your email.
      </a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = register;
