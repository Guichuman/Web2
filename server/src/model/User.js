const Sequelize = require("sequelize");
const database = require("../database/database")
const bcrypt = require("bcrypt")

const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    acesso: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

User.prototype.verificaSenha = function (password, next){

}




module.exports = User