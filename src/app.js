const http = require('http');
const getUsers = require('./modules/users');

const server = http.createServer((request, response) =>{
    if (request.url === '/users') {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type: application/json"
        response.write(getUsers());
        response.end();

        return;
    }

    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain"
    response.write("Hello, world");
    response.end();
});

server.listen(3003, () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003")
});