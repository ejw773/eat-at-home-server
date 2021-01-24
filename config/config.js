module.exports = {
  "development": {
    "username": "wilcott",
    "password": null,
    "database": "eat-at-home_db",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}

//
// module.exports = {
//   "development": {
//     "username": "wilcott",
//     "password": null,
//     "database": "eat-at-home_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "wilcott",
//     "password": null,
//     "database": "eat-at-home_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "wilcott",
//     "password": null,
//     "database": "eat-at-home_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }
