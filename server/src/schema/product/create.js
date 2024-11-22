import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  gender: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.string().required().min(0),
  quantity: Joi.string().required().min(0),
  description: Joi.string().required(),
  available_sizes: Joi.string().required(),
});
