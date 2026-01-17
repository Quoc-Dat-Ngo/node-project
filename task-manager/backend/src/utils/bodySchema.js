const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(1).required(),
  active: Joi.boolean().required(),
  description: Joi.string().allow(null, '').optional(),
});

module.exports = schema;
