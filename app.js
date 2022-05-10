const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const Usuario = require('./model/Usuario')
const handlebars = require('express-handlebars')
const path = require("path")
app.use(express.static(__dirname + '/public'));
//CONFIGURA O HANDLEBARS
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
})
);
//CONTINUA CONFIRAÇÃO DO HANDLEBARS
//app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//CONFIGURA O BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
    // res.render("cadastro")
})
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + "/views/cadastro.html")
    // res.render("cadastro")
})

app.post('/cadastro', (req, res) => {
    Usuario.create({
        cpf: req.body.cpf,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        // data: req.body.data,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano,
        email: req.body.email,
        telefone: req.body.telefone,
        numeroCasa: req.body.numeroCasa,
        rua: req.body.rua,
        cep: req.body.cep,
        sexo: req.body.sexo,
        // foto: req.body.foto,
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/usuarios', (req, res) => {
    Usuario.findAll().then((dados) => {
        res.render('usuarios', { dados: dados })
    })
})

app.get('/pesquisar', (req, res) => {
    Usuario.findAll().then((dados) => {
        res.render('usuarios', { usuarios: dados })
    })
})

app.get('/excluir/:cpf', (req, res) => {
    Usuario.destroy(
        {
            where: { cpf: req.params.cpf }
        }
    ).then(() => {
        res.redirect('/pesquisar')
    })
})

app.post('/editar/:cpf', (req, res) => {
    const data = req.body;
    const { cpf } = req.params;

    Usuario.update(data, {
        where: {
            cpf
        }
    }).then(() => {
        res.redirect('/pesquisar')
        
    })
})

app.get('/editar/:cpf', async (req, res) => {
    const { cpf } = req.params;

    const user = await Usuario.findOne({
        where: {
            cpf
        }
    });

    return res.render("atualizar", { user })
})



app.listen(port, () => {
    console.log("Servidor ligado")
})