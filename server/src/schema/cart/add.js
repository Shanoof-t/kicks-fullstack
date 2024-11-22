import Joi from "joi";

export default Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  brand: Joi.string().required(),
  gender: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required().min(0),
  image_url: Joi.string().required(),
  size: Joi.number().required(),
});
