const Database = require('better-sqlite3');
const path = require('path');

// Open (or create) the database file in the project root
const dbPath = path.join(__dirname, '..', 'property-api.db');
const db = new Database(dbPath);

// Enable foreign keys (off by default in SQLite — a classic gotcha)
db.pragma('foreign_keys = ON');

// Create the schema if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    monthly_rent REAL,
    bedrooms INTEGER,
    is_available INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT
  );
`);

module.exports = db;