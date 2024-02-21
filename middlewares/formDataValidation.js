const Joi = require("joi");

const formDataValidation = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({ "string.email": "Invalid e-mail" }),
  phone: Joi.string()
    .trim()
    .pattern(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/
    )
    .messages({ "string.pattern": "Invalid phone number" }),
  website: Joi.string()
    .trim()
    .pattern(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .messages({ "string.pattern": "Invalid website" }),
  name: Joi.string().trim(),
  message: Joi.string().trim().required(),
  subscribe: Joi.boolean(),
});

module.exports = formDataValidation;
