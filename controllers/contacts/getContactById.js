const Contact = require("../../models/contact");

async function getById(req, res, next) {
  const { contactId } = req.params;
  try {
    const doc = await Contact.findById(contactId).exec();
    if (doc === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(doc);
  } catch (error) {
    next(error);
  }
}

module.exports = getById;