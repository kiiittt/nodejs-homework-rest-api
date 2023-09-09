const { User } = require("../../models/user");
const { emailSchema } = require("../../schemas/email");

const { sendEmail } = require("../../helpers");

const dotenv = require("dotenv");
dotenv.config();
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email not found",
      });
      return;
    }
    if (user.verify) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
      return;
    }
    const mail = {
      to: email,
      subject: "Please Verify Your Identity",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Verify Your Identity</a>`,
    };

    await sendEmail(mail);

    res.status(200).json({
      status: "Ok",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
