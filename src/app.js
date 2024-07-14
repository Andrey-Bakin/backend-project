const http = require("http");
const fs = require("fs");
const url = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const userName = url.parse(request.url, true).query;

  if (userName.hello !== undefined) {
    if (userName.hello) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${userName.hello}`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
  } else if (userName.users !== undefined) {
    fs.readFile("src/data/users.json", (error, getUsers) => {
      if (error) {
        response.statusCode = 500;
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(getUsers);
      }
    });
  } else if (Object.keys(userName).length === 0) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, world");
  } else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
