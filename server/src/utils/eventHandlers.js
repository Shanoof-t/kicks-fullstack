import "colors";

export const unhandledRejectionHandler = (server) => {
  process.on("unhandledRejection", (error) => {
    console.error(
      `Error Name : ${error.name}  Error: ${error.message}`.red.underline.bold
    );
    console.log("Unhandled rejection occured! Shutting down...".yellow.bold);

    server.close(() => {
      process.exit(1);
    });
  });
};
