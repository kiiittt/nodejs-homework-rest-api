const User = require("../../models/user");

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = logout;
