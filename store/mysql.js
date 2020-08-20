const mysql = require("mysql");

const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  connection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

function getAllProductByClient(table, clpr_clientid) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE clpr_clientid=${clpr_clientid}`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}

function getDetailProduct(idNumberAccount) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ct.cltr_id, ct.cltr_timesatamp, ct.cltr_description, c.curr_shortname, s.stat_name, ct.cltr_value*ct.cltr_type AS cltr_value,  

        (SELECT sum(ct1.cltr_value*ct1.cltr_type)
        FROM client_transactions ct1
        WHERE ct1.cltr_timesatamp<= ct.cltr_timesatamp) AS cltr_balance
        
        FROM client_transactions ct
        LEFT JOIN currency c ON curr_id=cltr_currency
        LEFT JOIN statuses s ON stat_id=cltr_status
        WHERE cltr_productnumber=${idNumberAccount}
        ORDER BY cltr_timesatamp`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}

function createProduct(table,data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

function createUsername(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

function getDataUser(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if(err) {
        return reject(err);
      }
      resolve(res[0] || null );
    });
  });
}
module.exports = {
  getAllProductByClient,
  getDetailProduct,
  createProduct,
  createUsername,
  getDataUser
};
