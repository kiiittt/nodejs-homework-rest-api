const User = require("../../models/user");

async function current(req, res, next) {
  const { _id } = req.user;

  try {
    const doc = await User.findById({ _id }).exec();
    return res.status(200).json({
      email: doc.email,
      subscription: doc.subscription,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = current;
