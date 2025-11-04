module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST || 'us-cdbr-east-03.cleardb.com',
    username: process.env.DB_USER || 'bc4c3bce367ad2',
    password: process.env.DB_PASSWORD || '86f4f379',
    database: process.env.DB_NAME || 'heroku_bbe604a93c2e2cf',
    charset: 'utf8',
    synchronize: true, // Enable to auto-create tables (set to false in production after initial setup)
    entities: [
      'dist/**/**.entity.js'
    ],
    logging: process.env.NODE_ENV !== 'production'? 'all': 'error',
    migrations: ["migration/*.js"],
    cli: {
      migrationsDir: "migration"
    },
    connectTimeout: 30000,
    acquireTimeout: 30000
  };
  