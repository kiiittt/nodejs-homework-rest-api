const Contact = require("../../models/contact");
const { addSchema } = require("../../schemas/contacts");

async function create(req, res, next) {
  const response = addSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    const errorMessage = response.error.details[0].message;
    res.status(400).json({ message: errorMessage });
  }
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  try {
    const doc = await Contact.create(contact);
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
}

module.exports = create;