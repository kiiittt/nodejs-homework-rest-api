const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  current,
  uploadAvatar,
  verifyEmail,
  resendVerifyEmail
};
