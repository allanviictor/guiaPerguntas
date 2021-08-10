var sequelize = require('sequelize')
var connection = require('./database')

const respostas = connection.define('respostas', {
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    idPergunta: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

respostas.sync({force:false});

module.exports = respostas