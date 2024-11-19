import { createStats } from "../services/statsService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

export const getStats = asynErrorHandler(async (req, res) => {
  const stats = await createStats();
  res
    .status(200)
    .json({
      status: "success",
      message: "Successfully fetched stats.",
      data: stats,
    });
});
