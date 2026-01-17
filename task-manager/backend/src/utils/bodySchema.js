const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  active: Joi.boolean(),
  description: Joi.string().allow('').optional(),
});

module.exports = schema;
