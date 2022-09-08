const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const file = await jimp.read(resultUpload);
    await file.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", resultUpload);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json(avatarURL);
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
