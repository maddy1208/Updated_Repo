const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const env = require("./env");
const logger = require("../utils/logger");

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("error", (err) => {
  logger.error("Unexpected PostgreSQL pool error", { error: err.message });
});

async function initDb() {
  const sqlFilePath = path.join(__dirname, "../../migrations/001_init.sql");
  const sql = fs.readFileSync(sqlFilePath, "utf8");

  logger.info("Initializing PostgreSQL database tables...");
  await pool.query(sql);
  logger.info("PostgreSQL database tables initialized successfully.");
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  initDb,
};
