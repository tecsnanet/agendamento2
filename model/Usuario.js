const db = require('../config/db')
const Usuario = db.sequelize.define('usuario',{
    cpf:{
        type: db.Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull:false
    },
    nome:{
        type: db.Sequelize.STRING(50),
        allowNull:false
    },
    sobrenome:{
        type: db.Sequelize.STRING(50),
        allowNull:false
    },
    dia:{
        type: db.Sequelize.INTEGER(2),
        allowNull: false
    },
    mes:{
        type: db.Sequelize.STRING(),
        allowNull: false
    },
    ano:{
        type: db.Sequelize.INTEGER(4),
        allowNull: false
    },
    email:{
        type: db.Sequelize.STRING(50),
        allowNull:false,
    },
    telefone:{
        type: db.Sequelize.STRING(50),
        allowNull:false,
    },numeroCasa:{
        type: db.Sequelize.INTEGER(4),
        allowNull:false,
    },
    rua:{
        type: db.Sequelize.STRING(50),
        allowNull:false,
    },
    cep:{
        type: db.Sequelize.STRING(50),
        allowNull:false,
    },
    sexo:{
        type: db.Sequelize.STRING(50),
        allowNull:false,
    },
 
})

// Usuario.sync({force:true})

module.exports = Usuario;
