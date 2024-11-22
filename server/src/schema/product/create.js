import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  gender: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required().min(1),
  description: Joi.string().required(),
  available_sizes: Joi.string().required(),
});
