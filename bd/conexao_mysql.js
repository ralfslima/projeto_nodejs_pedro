// importar modulo mysql
const mysql = require('mysql2');

// configuracao de conexao
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'projeto'
});

// Teste de conexao
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexao efetuada com sucesso!')
});

// Exportar modulo
module.exports = conexao;