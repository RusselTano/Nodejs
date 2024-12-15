const myModule = require("./module1");
const colors = require("colors");
const util = require("util");
const events = require("./events");
// const Emitter = require("./Emitter");

const Emitter = require("events");

// const test = "Hello World";
// console.log(test, colors.red(test));

// myModule();
// console.log(util.types.isDate(123));
// console.log("yowoewowow".rainbow);

// emitter and events
const emitter = new Emitter();

const opened = () => console.log("File opened");
const opened2 = () => console.log("File opened2");

//Ajout d'un listener pour l'événement FILE_OPENED cest l'equivalent de addEventListener en javascript
emitter.on(events.FILE_OPENED, opened);
emitter.on(events.FILE_OPENED, opened2);
emitter.on(events.FILE_READ, () => console.log("File read"));

//Émission de l'événement FILE_OPENED
emitter.emit(events.FILE_OPENED);
emitter.emit(events.FILE_READ);

//Pour lister les événements pour lesquels nous avons enregistré au moins une fonction listener, il suffit de faire eventNames().
console.log("\nListe des evenements ayant un listener");
console.log(emitter.eventNames());

//Pour lister les fonctions listeners enregistrées pour un événement donné, il suffit de faire listeners(event).
console.log("\nListe des listener de " + events.FILE_OPENED);
console.log(emitter.listeners(events.FILE_OPENED));

//Pour supprimer un listener pour un événement donné, il suffit de faire removeListener(event, listener).
console.log(
  "\nListe des listener de " +
    events.FILE_OPENED +
    " apres suppression de opened"
);
emitter.removeListener(events.FILE_OPENED, opened);
console.log(emitter.listeners(events.FILE_OPENED));

//Pour supprimer tous les listeners pour un événement donné, il suffit de faire removeAllListeners(event).
console.log("\nListe des listener de " + events.FILE_OPENED + " apres suppression de tous ses listeners");
emitter.removeAllListeners(events.FILE_OPENED);
console.log(emitter.listeners(events.FILE_OPENED));

console.log("Un evenement ayant un listener");
console.log(emitter.eventNames());

//Pour supprimer tous les listeners pour tous les événements, il suffit de faire removeAllListeners().
console.log("\nListe des evenements apres suppression de tous les listeners");
emitter.removeAllListeners();
console.log(emitter.eventNames());
console.log("Aucun evenement ayant un listener".italic + "\n");

