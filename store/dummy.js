const db = {
  user: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Jose" },
  ],
  clients_products: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Jose" },
  ],
  client_transactions: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Jose" },
  ],
  clients_password: [],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let col = await list(table);
  return col.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  db[table].push(data);
}

async function query(table, query) {
  let col = await list(table);
  let keys = Object.keys(query);
  let key = keys[0];
  return col.filter((item) => item[key] === query[key])[0] || null;
}

module.exports = {
  list,
  upsert,
  get,
  query,
};
