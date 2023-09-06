const { addSchema } = require("../../schemas/contacts");

const Contact = require("../../models/contact");


async function update(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const response = addSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    const errorMessage = response.error.details[0].message;
    res.status(400).json({ message: errorMessage });
  }
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    }).exec();
    if (result === null) {
      const errorMessage = response.error.details[0].message;
      res.status(400).json({ message: errorMessage });
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = update;