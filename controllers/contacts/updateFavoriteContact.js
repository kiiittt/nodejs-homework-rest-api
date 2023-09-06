const { updateFavoriteSchema } = require("../../schemas/contacts");

const Contact = require("../../models/contact");
const mongoose = require("mongoose");


async function updateFavorite(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  const response = updateFavoriteSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    const errorMessage = response.error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }

  const contact = {
    favorite: req.body.favorite,
  };

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    }).exec();

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateFavorite;