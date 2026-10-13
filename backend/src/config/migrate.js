const logger = require("../utils/logger");

async function migrate() {
  try {
    await db.initDb();
  } catch (err) {
    logger.error("Database migration failed", {
      error: err.message,
      code: err.code,
    });
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

migrate().catch((err) => {
  logger.error("Failed to close PostgreSQL connection pool", {
    error: err.message,
    code: err.code,
  });
  process.exitCode = 1;
});
