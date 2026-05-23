// services/properties.service.js
// Owns ALL data operations. No HTTP, no Express, no req/res.

let properties = [];
let nextId = 1;

function findAll() {
    return properties;
}

function findById(id) {
    return properties.find(p => p.id === id);
}

function create(data) {
    const newProperty = {
        id: nextId,
        title: data.title,
        city: data.city,
        monthly_rent: data.monthly_rent || null,
        bedrooms: data.bedrooms || null,
        is_available: data.is_available ?? true,
        created_at: new Date().toISOString()
    };

    properties.push(newProperty);
    nextId++;

    return newProperty;
}

function update(id, data) {
    const property = properties.find(p => p.id === id);

    if (!property) {
        return null;
    }

    property.title = data.title;
    property.city = data.city;
    property.monthly_rent = data.monthly_rent ?? property.monthly_rent;
    property.bedrooms = data.bedrooms ?? property.bedrooms;
    property.is_available = data.is_available ?? property.is_available;
    property.updated_at = new Date().toISOString();

    return property;
}

function remove(id) {
    const propertyIndex = properties.findIndex(p => p.id === id);

    if (propertyIndex === -1) {
        return false;
    }

    properties.splice(propertyIndex, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};