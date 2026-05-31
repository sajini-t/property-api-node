// services/properties.service.js
// Owns ALL data operations. No HTTP, no Express, no req/res.

const db = require('../db/database.js');

function findAll() {
    const rows = db.prepare('Select * From properties').all();
    return rows.map(rowToProperty);
}

function findById(id) {
    const row = db.prepare('Select * From properties where id = ?').get(id);
    return rowToProperty(row);
}

function create(data) {
    const created_at = new Date().toISOString();
    const result = db.prepare(`
        INSERT INTO properties (title, city, monthly_rent, bedrooms, is_available, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            data.title,
            data.city,
            data.monthly_rent ?? null,
            data.bedrooms ?? null,
            boolToInt(data.is_available ?? true),
            created_at
        );

    return findById(result.lastInsertRowid);
}

function update(id, data) {
    const existing = db.prepare('Select * from properties Where id = ?').get(id);
    if (!existing) return null;

    const updated_at = new Date().toISOString();

    db.prepare(`
        UPDATE properties
        SET title = ?,
        city = ?,
         monthly_rent = ?,
        bedrooms = ?,
        is_available = ?,
        updated_at = ?
        Where id = ?
        `).run(
            data.title ?? existing.title,
            data.city ?? existing.city,
            data.monthly_rent ?? existing.monthly_rent,
            data.bedrooms ?? existing.bedrooms,
            boolToInt(data.is_available ?? intToBool(existing.is_available)),
            updated_at,
            id
        );

        return findById(id);
}

function remove(id) {
    const result = db.prepare('Delete from properties where id = ?').run(id);
    return result.changes > 0;
}

// ---------- private helpers ----------

// Converts a DB row to the API-facing object shape.
// The only difference: is_available is a real boolean, not a 0/1 integer.
function rowToProperty(row){
    if (!row) return null;
    return {
        ...row,
        is_available: intToBool(row.is_available)
    };
}

function boolToInt(value){
    return value ? 1 : 0;
}

function intToBool(value){
    return value === 1;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};