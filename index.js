const express = require('express')
const app = express();
const connection = require('./database/database')
const pergunta = require('./database/perguntas')
var repostas = require('./database/respostas')


connection
    .authenticate()
    .then(() =>{
        console.log('ok!')
    })
    .catch((erro)=>{
        console.log(erro)
    })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* app.get("/:nome/:linguagem", (requisicao, resposta) =>{
    const nome = requisicao.params.nome
    const tecnologia = requisicao.params.linguagem
    const menssagem = false
    const pessoas = [
        {nome: "allan", idade: 22},
        {nome: "roberto", idade: 24},
        {nome: "silva", idade: 31},
    ]
    resposta.render('index', {
        nome,
        idade: 22,
        curso: tecnologia,
        projeto: "guia perguntas",
        menssagem,
        pessoas
    })
}) */

app.get('/',(req, respo) => {
    pergunta.findAll({raw: true,order:[ ['id','DESC']]}).then((perguntas)=> {
        respo.render('index',{
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (requisicao, resposta) => {
    resposta.render('perguntar')
    
})

app.post('/salvarperguntas',(requisicao, resposta) => {
    let titulo = requisicao.body.titulo
    let desc = requisicao.body.descricao
    /* resposta.send(`titulo:  ${titulo} e descricao:  ${desc}`) */
    pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(()=> {
        resposta.redirect('/')
    })
})

app.get('/pergunta/:id',(req, respo) => {
    let id = req.params.id
    pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if(pergunta != undefined){
            respo.render('pergunta',{
                pergunta
            })
        }else {
            respo.render('perguntar')
        }
    })
})

app.listen(4000, ()=> {
    console.log('servidor rodando !!')
})