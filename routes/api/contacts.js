const express = require('express');
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
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
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
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const missingField = error.details[0].context.key;
      res.status(400).json({ message: `Missing required ${missingField} field` });
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
    const { contactId } = req.params;

    if (!req.body) {
      res.status(400).json({ message: 'Missing fields' });
      return; 
    }

    const { error } = contactSchema.validate(req.body);
    
    if (error) {
      const missingField = error.details[0].context.key;
      res.status(400).json({ message: `Missing required ${missingField} field` });
    } else {
      const updatedContact = await updateContact(contactId, req.body);
      
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
