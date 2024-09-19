// importar modulo express
const express = require('express');

// importar modulo fileupload
const fileupload = require('express-fileupload');

// importar modulo express-handlebars
const { engine } = require('express-handlebars');

// Importar modulo de servicos
const servico = require('./servicos/produtos_servico');

// App
const app = express();

// habilitando o upload de arquivos
app.use(fileupload());

// adicionar bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'))

// Referenciar a pasta de imagens
app.use('/imagens', express.static('./imagens'));

// Configuração do express-handlebars
app.engine('handlebars', engine({
    helpers: {
        // Função auxiliar para verificar igualdade
        condicionalIgualdade: function (parametro1, parametro2, options) {
            return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipulacao de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rota principal
app.get('/', function(req, res){
    servico.formularioCadastro(req, res);
});

// Rota principal contendo a situacao
app.get('/:situacao', function(req, res){
    servico.formularioCadastroComSituacao(req, res);
});

// Rota de listagem
app.get('/listar/:categoria', function(req, res){
    servico.listagemProdutos(req, res);
});

// Rota de pesquisa
app.post('/pesquisa', function(req, res){
    servico.pesquisa(req, res);
});

// Rota de cadastro
app.post('/cadastrar', function(req, res){
    servico.cadastrarProduto(req, res);
});

// Rota para remover produtos
app.get('/remover/:codigo&:imagem', function(req, res){
    servico.removerProduto(req, res);
});

// Rota para redirecionar para o formulario de alteracao/ edicao
app.get('/formularioEditar/:codigo', function(req, res){
    servico.formularioEditar(req, res);
});

// Rota para editar produtos
app.post('/editar', function(req, res) {
    servico.editarProduto(req, res);
});

// Servidor
app.listen(8080);