const fs = require("fs");

fs.mkdir("./newFolder/subFolder",{recursive: true}, (err) => {});

fs.readdir("./newFolder", (err, files) => {});

// fs.rmdir("./newFolder", (err) => {});
fs.rm("./newFolder/subFolder", {recursive: true}, (err) => {});

fs.stat('./test.txt', (err, stat) => console.log(stat.isFile()));