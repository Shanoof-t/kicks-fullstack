import Joi from "joi";

export default Joi.object({
  action: Joi.string().required(),
});
