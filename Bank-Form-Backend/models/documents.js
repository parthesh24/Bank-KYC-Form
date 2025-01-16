const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Documents = sequelize.define('documents', {
    id : {type: DataTypes.INTEGER, autoIncrement: true, primaryKey : true},
    userid: {type: DataTypes.INTEGER, references: {model:User, key:'id'}},
    customerphoto: {type: DataTypes.BLOB('long') },
    customersignature: {type: DataTypes.BLOB('long') },
    aadharcardimage: {type: DataTypes.BLOB('long') },
    typeof_addressproof: {type: DataTypes.ENUM('AADHAR', 'PASSPORT', 'ELECTRICITY BILL', 'WATER BILL') },
    addressproof: {type: DataTypes.BLOB('long') },
    otherdocuments: {type: DataTypes.BLOB('long') },
    additionalcomments: {type: DataTypes.TEXT },
    profile_image: {type: DataTypes.BLOB('long') },
});


User.hasOne(Documents, { foreignKey: 'userid', onDelete: 'CASCADE' });
Documents.belongsTo(User, { foreignKey: 'userid' });

module.exports = {Documents, User};