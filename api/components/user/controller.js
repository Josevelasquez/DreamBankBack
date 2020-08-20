const auth = require('../auth/');

const TABLE_CLIENTS_PRODUCT = 'clients_products';
const TABLE_TRANSACTIONS = 'client_transactions';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy')
    }
    
    // get all product
    async function getAllProductByClient(idCliente) {
        return store.getAllProductByClient(TABLE_CLIENTS_PRODUCT,idCliente)
    }

    // get detail product (transactions)
    async function getDetailProduct(idNumberAccount) {
        return store.getDetailProduct(idNumberAccount);
    }

    // Create new product and add pending state
    async function createProduct(body) {
        const product = {
            clpr_number: body.clpr_number,
            clpr_prodid: body.clpr_prodid,
            clpr_clientid: body.clpr_clientid,
            clpr_name: body.clpr_name || '',
            clpr_status: body.clpr_status || 3,
            clpr_currency: body.clpr_currency
        }
        return store.createProduct(TABLE_CLIENTS_PRODUCT, product);
    }
    

    // create newClient
    async function createUsername(body) {
        if (body.password || body.username) {
            await auth.createUsername({
                username: body.username,
                password: body.password,
                idCliente: body.idCliente
            })
        }
    }

    return {
        createProduct,
        getAllProductByClient,
        getDetailProduct,
        createUsername
    }
}