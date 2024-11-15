const asynErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      console.log("err>>>>", err);
      next(err);
    });
  };
};
export default asynErrorHandler;
