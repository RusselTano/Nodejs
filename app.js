const fs = require("fs");

// fs.open("./test.txt", "a+", (err, fd) => {
//   //erreur et file descriptor (fd)
//   if (err) throw err; //si erreur, on la lance
//   fs.write(fd, "Hello World !", (err, written, str) => {
//     console.log({ err, written, str }); //on affiche les erreurs, le nombre de caractères écrits et la chaine de caractères
//     fs.close(fd, (err) => {});
//   }); //on écrit dans le fichier
// });


fs.readFile("./test.txt", (err, data) => {
  console.log(data.toString());
})
fs.appendFile("./test.txt", "Bye", (err) => {});
// fs.unlink("./test.txt", (err) => {}); //supprime le fichier
fs.readFile("./test.txt", (err, data) => {
  console.log(data.toString());
})