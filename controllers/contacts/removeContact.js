const Contact = require("../../models/contact");


async function remove(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId).exec();
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = remove;