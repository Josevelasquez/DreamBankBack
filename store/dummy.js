const db = {
  user: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Jose" },
  ],
};

async function list(table) {
  return db[table];
}

async function get(table, id) {
  let col = await list(table);
  return col.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  db[collection].push(data);
}

async function getDetailProduct(table, id) {}

async function createProduct(table, data) {}

async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  upsert,
  get,
  getDetailProduct,
  createProduct,
  remove,
};
