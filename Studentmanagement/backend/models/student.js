
module.exports = (sequelize, Sequelize) => {
    const StudentSchema = sequelize.define("student", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        class: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
    });
    return StudentSchema;
  };
