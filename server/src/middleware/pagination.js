export default function (model) {
  return async (req, res, next) => {
    const { page, limit } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    if (startIndex > 0) {
      result.prev = { page: parseInt(page) - 1, limit: parseInt(limit) };
    }
    if (endIndex < model.length) {
      result.next = { page: parseInt(page) + 1, limit: parseInt(limit) };
    }
    result.results = await model.find().limit(limit).skip(startIndex);
    req.paginatedResults = result;
    next();
  };
}
