const http = require("http");

const server = http.createServer((req, res) => {
  //req = request, res = response
  console.log("I hear you! Thanks for calling me");
  res.end("Hello World");
});
/**
 const server = http.createServer();
server.on('request', (request, response) => {
  // la même chose qu'avant
}); */
server.listen(3000);
 