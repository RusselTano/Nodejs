Le module `fs` (abréviation de **file system**) est l'un des modules principaux de Node.js, permettant d'interagir avec le système de fichiers de manière synchronisée ou asynchrone. Voici un **guide complet** pour bien l'utiliser, étape par étape.

---

## **Introduction**
### Importation du module
```javascript
const fs = require('fs');
```

Le module propose des méthodes asynchrones (basées sur des callbacks ou des Promises) et des versions synchrones. Préférez toujours les versions **asynchrones** dans les applications en production pour éviter de bloquer le thread principal.

---

## **1. Lecture de fichiers**
### Lecture asynchrone
```javascript
fs.readFile('chemin/vers/fichier.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur de lecture :', err);
        return;
    }
    console.log('Contenu du fichier :', data);
});
```

### Lecture avec Promises
```javascript
const fsPromises = require('fs/promises');

fsPromises.readFile('chemin/vers/fichier.txt', 'utf8')
    .then(data => console.log('Contenu :', data))
    .catch(err => console.error('Erreur :', err));
```

### Lecture synchrone (éviter si possible)
```javascript
try {
    const data = fs.readFileSync('chemin/vers/fichier.txt', 'utf8');
    console.log('Contenu du fichier :', data);
} catch (err) {
    console.error('Erreur :', err);
}
```

---

## **2. Écriture dans un fichier**
### Écriture asynchrone
```javascript
fs.writeFile('chemin/vers/fichier.txt', 'Hello, Node.js!', (err) => {
    if (err) {
        console.error('Erreur d\'écriture :', err);
        return;
    }
    console.log('Fichier écrit avec succès !');
});
```

### Écriture avec Promises
```javascript
fsPromises.writeFile('chemin/vers/fichier.txt', 'Hello, Promises!')
    .then(() => console.log('Fichier écrit avec succès !'))
    .catch(err => console.error('Erreur :', err));
```

### Append (ajouter du contenu au lieu d'écraser)
```javascript
fs.appendFile('chemin/vers/fichier.txt', '\nNouvelle ligne ajoutée.', (err) => {
    if (err) {
        console.error('Erreur d\'ajout :', err);
        return;
    }
    console.log('Ligne ajoutée au fichier !');
});
```

---

## **3. Suppression de fichiers**
```javascript
fs.unlink('chemin/vers/fichier.txt', (err) => {
    if (err) {
        console.error('Erreur de suppression :', err);
        return;
    }
    console.log('Fichier supprimé avec succès !');
});
```

Avec Promises :
```javascript
fsPromises.unlink('chemin/vers/fichier.txt')
    .then(() => console.log('Fichier supprimé !'))
    .catch(err => console.error('Erreur :', err));
```

---

## **4. Gestion des dossiers**
### Création d'un dossier
```javascript
fs.mkdir('chemin/vers/nouveau-dossier', { recursive: true }, (err) => {
    if (err) {
        console.error('Erreur de création :', err);
        return;
    }
    console.log('Dossier créé avec succès !');
});
```

Avec Promises :
```javascript
fsPromises.mkdir('chemin/vers/nouveau-dossier', { recursive: true })
    .then(() => console.log('Dossier créé !'))
    .catch(err => console.error('Erreur :', err));
```

### Lecture du contenu d'un dossier
```javascript
fs.readdir('chemin/vers/dossier', (err, files) => {
    if (err) {
        console.error('Erreur de lecture :', err);
        return;
    }
    console.log('Fichiers dans le dossier :', files);
});
```

### Suppression d'un dossier
```javascript
fs.rmdir('chemin/vers/dossier', (err) => {
    if (err) {
        console.error('Erreur de suppression :', err);
        return;
    }
    console.log('Dossier supprimé avec succès !');
});
```

---

## **5. Renommer ou déplacer des fichiers**
```javascript
fs.rename('chemin/ancien-nom.txt', 'chemin/nouveau-nom.txt', (err) => {
    if (err) {
        console.error('Erreur de renommage :', err);
        return;
    }
    console.log('Fichier renommé avec succès !');
});
```

---

## **6. Informations sur un fichier ou dossier**
### Vérifier si un fichier ou dossier existe
> Cette méthode est dépréciée : utilisez `fs.access()` à la place.
```javascript
fs.access('chemin/vers/fichier.txt', fs.constants.F_OK, (err) => {
    console.log(err ? 'Fichier n\'existe pas' : 'Fichier existe');
});
```

### Obtenir des informations détaillées
```javascript
fs.stat('chemin/vers/fichier.txt', (err, stats) => {
    if (err) {
        console.error('Erreur :', err);
        return;
    }
    console.log('Statistiques du fichier :', stats);
    console.log('Est un fichier ?', stats.isFile());
    console.log('Est un dossier ?', stats.isDirectory());
});
```

---

## **7. Streams (Flux de lecture et écriture)**
Les streams sont très utiles pour lire/écrire de gros fichiers de manière efficace.

### Lire avec un stream
```javascript
const readStream = fs.createReadStream('chemin/vers/fichier.txt', 'utf8');
readStream.on('data', (chunk) => {
    console.log('Chunk reçu :', chunk);
});
readStream.on('end', () => {
    console.log('Lecture terminée.');
});
readStream.on('error', (err) => {
    console.error('Erreur :', err);
});
```

### Écrire avec un stream
```javascript
const writeStream = fs.createWriteStream('chemin/vers/fichier.txt');
writeStream.write('Première ligne.\n');
writeStream.write('Deuxième ligne.\n');
writeStream.end(() => {
    console.log('Écriture terminée.');
});
```

### Combinaison lecture/écriture (pipeline)
```javascript
const readStream = fs.createReadStream('chemin/source.txt');
const writeStream = fs.createWriteStream('chemin/destination.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Copie terminée.');
});
```

---

## **8. Gestion des droits d’accès**
### Modifier les permissions d’un fichier
```javascript
fs.chmod('chemin/vers/fichier.txt', 0o644, (err) => {
    if (err) {
        console.error('Erreur :', err);
        return;
    }
    console.log('Permissions modifiées.');
});
```

### Modifier le propriétaire d’un fichier
```javascript
fs.chown('chemin/vers/fichier.txt', uid, gid, (err) => {
    if (err) {
        console.error('Erreur :', err);
        return;
    }
    console.log('Propriétaire modifié.');
});
```

---

## **9. Watcher : Surveiller les modifications**
```javascript
fs.watch('chemin/vers/dossier', (eventType, filename) => {
    console.log(`Événement : ${eventType} sur ${filename}`);
});
```

---

## **Bonnes pratiques**
1. Utilisez **Promises** ou `fs/promises` pour un code plus lisible.
2. Préférez les versions asynchrones (`readFile`, `writeFile`, etc.) pour éviter de bloquer l'exécution.
3. Gérez toujours les erreurs (via des callbacks, `.catch()`, ou `try/catch`).

Avec ce guide, tu es prêt à manipuler le système de fichiers efficacement dans Node.js. 🚀 Si tu as des questions, n'hésite pas !