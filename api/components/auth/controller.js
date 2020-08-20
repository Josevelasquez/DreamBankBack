const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLA_CLIENTS_PASSWORD = 'clients_password';

module.exports = function ( injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA_CLIENTS_PASSWORD, {
            clpa_username:username
        });

        return bcrypt.compare(password, data.clpa_password)
            .then((samePassword) => {
                if(samePassword === true) {
                    return auth.sign(data)
                } else {
                    throw new Error('Information invalid');
                }
            });
    }

    async function createUsername(data) {
        const authClientPassword = {
            clpa_clientid: data.idCliente,
        }

        if (data.username) {
            authClientPassword.clpa_username = data.username;
        }

        if (data.password) {
            authClientPassword.clpa_password = await bcrypt.hash(data.password, 5);
        }
        return store.upsert(TABLA_CLIENTS_PASSWORD, authClientPassword);
    }

    return {
        login,
        createUsername
    }
}

