const Sequelize = require("sequelize");
const database = require("../database/database")
const ProdutoModel = require("./Produto")

const Venda = database.define('vendas', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    desconto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco_final: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Venda.belongsTo(ProdutoModel, {
    constraint: true
});
ProdutoModel.hasMany(Venda);

module.exports = Venda