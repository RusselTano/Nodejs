module.exports = class Emitter {
  constructor() {
    this.events = {};
  }
  on(type, listener){
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }
  emit(type){
    if(this.events[type]){
      this.events[type].forEach(listener => listener());
    }
  }

};

// on(type, listener){
//   this.events[type] = this.events[type] || [];
//   this.events[type].push(listener);
// }

/**
 * type => le type de l'evenement a ecouter
 * listener => la fonction a executer
 * this.events[type] = this.events[type] || []; => si this.events[type] n'existe pas, on le cree bref on aura un array vide
 * this.events[type].forEach(listener => listener()); => on parcours le tableau des listeners
 */