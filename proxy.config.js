/*
    Esta configuração é necessária para o front conseguir acessar o servidor de aplicação rodando na mesma máquina
*/

const proxy = [
    {
        context: '/api',
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' }
    }
];

module.exports = proxy;