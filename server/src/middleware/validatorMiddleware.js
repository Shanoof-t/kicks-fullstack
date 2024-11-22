export default function (schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(error);
    } else {
      next();
    }
  };
}
