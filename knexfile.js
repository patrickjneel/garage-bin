module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
