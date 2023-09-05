const Joi = require("joi");


const addSchema = Joi.object({
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
  favorite: Joi.boolean()
});


const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});



module.exports = {
  addSchema,
  updateFavoriteSchema,
};
