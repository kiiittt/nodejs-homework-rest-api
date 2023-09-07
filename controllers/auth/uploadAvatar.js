const path = require("node:path");
const User = require("../../models/user");
const crypto = require("node:crypto");
const Jimp = require("jimp");

async function uploadAvatar(req, res, next) {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extname = path.extname(originalname);
    const basename = path.basename(originalname, extname);
    const filename = `${basename}-${crypto.randomUUID()}${extname}`;

    const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
    const resultUpload = path.join(avatarDir, filename);

    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250, 250).quality(60).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = uploadAvatar;
