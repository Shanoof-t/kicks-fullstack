import Joi from "joi";

export default Joi.object({
  email: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  location: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit number",
    }),
  payment_method: Joi.string().required(),
});
