module.exports = {
    HOST: "localhost",
    USER: "username",
    PASSWORD: "password",
    DB: "studentsandteachers",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };