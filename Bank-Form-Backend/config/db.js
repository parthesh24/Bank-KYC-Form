const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'user_data', 
    'root', 
    'Parthesh@944',
    {
    host: 'localhost',
    dialect: 'mysql',
    }
)

module.exports = sequelize;