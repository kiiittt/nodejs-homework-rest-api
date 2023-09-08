// const { User } = require("../../models/user");

// const verifyEmail = async (req, res, next) => {
//   try {
//     const { verificationToken } = req.params;
//     const user = await User.findOne({ verificationToken });
//     if (!user) {
//       res.status(404).json({
//         status: "Not Found",
//         code: 404,
//         message: "User not found",
//       });
//       return;
//     }
//     await User.findByIdAndUpdate(user._id, {
//       verify: true,
//       verificationToken: null,
//     });
//     res.status(200).json({
//       status: "OK",
//       code: 200,
//       message: "Verification successful",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = verifyEmail;
