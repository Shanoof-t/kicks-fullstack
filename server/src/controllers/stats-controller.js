import { createStats } from "../services/index.js";
import { asynErrorHandler } from "../utils/error-handlers.js";

export const getStats = asynErrorHandler(async (req, res) => {
  const stats = await createStats();
  res.status(200).json({
    status: "success",
    message: "Successfully fetched stats.",
    data: stats[0],
  });
});
