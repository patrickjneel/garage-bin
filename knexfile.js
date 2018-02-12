
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin',
    useNullAsDefualt: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
      useNullAsDefault: true
    },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin_test',
    useNullAsDefualt: true,
    migrations: {
      directory: __dirname + 'db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
};
