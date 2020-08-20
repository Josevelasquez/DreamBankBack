module.exports = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notsecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '8tMQE5nosU',
        password: process.env.MYSQL_PASS || '1kWoDGj2NS',
        database: process.env.MYSQL_DB || '8tMQE5nosU',
    },
}