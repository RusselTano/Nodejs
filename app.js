const path = require('path');
const express = require('express');
const app = express();
const port = 3500;
// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io')(server);
const test = path.dirname("./app.js");
// const test2 = path.join("./index.html");
console.log("Methodes de l'objet path : ");
console.log("basename(path[, ext]) : " + path.basename(__filename) + " - Renvoie le nom du fichier sans chemin");
console.log("delimiter : " + path.delimiter + " - Caractere de separation des chemins");
console.log("dirname(path) : " + path.dirname(__filename) + " - Renvoie le chemin sans le nom du fichier");
console.log("extname(path) : " + path.extname(__filename) + " - Renvoie l'extension du fichier");
console.log("format(pathObject) : " + path.format({dir: 'C:\\path\\dir', base: 'file.txt'}) + " - Formate un objet path en chaine de caractere");
console.log("isAbsolute(path) : " + path.isAbsolute(__filename) + " - Renvoie si le chemin est absolu");
console.log("join([...paths]) : " + path.join(__dirname, '..', 'dist') + " - Concatene des chemins");
console.log("normalize(path) : " + path.normalize(__filename) + " - Normalise un chemin");
console.log("parse(path) : " + path.parse(__filename) + " - Renvoie un objet path");
console.log("relative(from, to) : " + path.relative(__dirname, __filename) + " - Renvoie le chemin relatif entre 2 chemins");
console.log("resolve([...paths]) : " + path.resolve(__dirname, '..', 'dist') + " - Renvoie le chemin absolu a partir de plusieurs chemins");
console.log("sep : " + path.sep + " - Caractere de separation des chemins");
console.log("win32 : " + path.win32 + " - Renvoie si le chemin est sous windows");

console.log(test);
// console.log(test2);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});