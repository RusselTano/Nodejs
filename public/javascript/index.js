// const axios = require('axios');

window.addEventListener("load", () => {
  const searchInput = document.querySelector('input[name="search"]');
  const studentsList = document.querySelector('.students');

  console.log(document.cookie);
  

  searchInput.addEventListener("input", async () => {
    try {
      const search = searchInput.value;
      const response = await axios.get(`/api/students/search?search=${search}`);
      studentsList.innerHTML = response.data;
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  });
});

/**
Un serveur peut stocker les données d'une session dans trois endroits : en mémoire, sur le disque ou dans une base de données.

Relation entre cookie et session
La relation entre cookie et session est la suivante : il suffit de sauvegarder dans un cookie un identifiant unique d'une session, et d'utiliser ce dernier pour récupérer la session et les données associées.
Les étapes de ce processus peuvent par exemple être les suivantes :

1 - L'utilisateur fait une requête au serveur, ce dernier vérifie si le cookie contenant l'id de la session existe.

2 - Si il n'existe pas, le serveur crée un id de session et crée un cookie contenant ce dernier.

3 - Si il existe, le serveur récupère l'id de la session et va pouvoir récupérer les données associées : en mémoire, sur le disque ou dans une base de données.
 */