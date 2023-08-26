const express = require('express');
const jsonParse = express.json();
const Joi = require('joi'); 
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');


// Валідація даних для POST та PUT запитів
const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Invalid email format",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
});



// GET /api/contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
    console.log(contacts);
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:id
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
      console.log(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post('/', jsonParse, async (req, res, next) => {
  try {
    const response = contactSchema.validate(req.body);

    if (typeof response.error !== "undefined") {
      const errorMessage = response.error.details[0].message; 
      res.status(400).json({ message: errorMessage });
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
});


// DELETE /api/contacts/:id
router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:contactId
router.put('/:contactId', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const response = contactSchema.validate(req.body);
    if (typeof response.error !== "undefined") {
      const errorMessage = response.error.details[0].message; 
      res.status(400).json({ message: errorMessage });
    }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
