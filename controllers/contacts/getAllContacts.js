const Contact = require("../../models/contact");

async function getAll(req, res, next) {
  try {
    const docs = await Contact.find().exec();
    return res.json(docs);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;
