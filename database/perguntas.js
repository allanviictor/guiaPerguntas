var sequelize = require('sequelize');
var connection  = require('./database')


const pergunta = connection.define('pergunta', {
    titulo: {
        type: sequelize.STRING, // string serve para textos pequenos 
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT, // text serve para textos grandes 
        allowNull: false
    }
})

pergunta.sync({force: false}).then(()=> {
    console.log('incluida')
})


module.exports = pergunta