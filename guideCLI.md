
## Guide MongoDB en Ligne de Commande

## Connexion à MongoDB

1. **Démarrer le shell MongoDB**
```bash
mongosh
```

2. **Connexion avec authentification**
```bash
mongosh "mongodb://127.0.0.1:27017/devDB" --username didicode --password 123
```

## Commandes de Base

### Base de données
```bash
# Afficher les bases de données
show dbs

# Utiliser/Créer une base de données
use devDB

# Afficher la base de données actuelle
db

# Supprimer la base de données actuelle
db.dropDatabase()
```

### Collections
```bash
# Afficher les collections
show collections

# Créer une collection
db.createCollection("users")

# Supprimer une collection
db.users.drop()
```

### CRUD Operations

## Create (Créer)
### Insérer un document
```js
db.users.insertOne({ name: "John", age: 30 })
```

### Insérer plusieurs documents
```js
db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
])
```

## Read (Lire)

### Trouver tous les documents
```js
db.users.find()
```
### Trouver avec un filtre
```js
db.users.find({ age: { $gt: 30 } })
```
### Trouver un seul document
```js
db.users.findOne({ name: "John" })
```
### Afficher en format plus lisible
```js
db.users.find().pretty()
```

## Update (Mettre à jour)
### Mettre à jour un document
```js
db.users.updateOne(
  { name: "John" },
  { $set: { age: 31 } }
)
```

### Mettre à jour plusieurs documents
```js
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "junior" } }
)
```

## Delete (Supprimer)
```bash
# Supprimer un document
db.users.deleteOne({ name: "John" })

# Supprimer plusieurs documents
db.users.deleteMany({ age: { $lt: 25 } })
```

### Requêtes Avancées

#### Opérateurs de comparaison
```bash
# Plus grand que ($gt)
db.users.find({ age: { $gt: 30 } })

# Plus petit que ($lt)
db.users.find({ age: { $lt: 30 } })

# Égal à ($eq)
db.users.find({ age: { $eq: 30 } })

# Différent de ($ne)
db.users.find({ age: { $ne: 30 } })
```

#### Tri et Limite
```bash
# Trier (1 pour ascendant, -1 pour descendant)
db.users.find().sort({ age: 1 })

# Limiter le nombre de résultats
db.users.find().limit(5)

# Skip (sauter) des résultats
db.users.find().skip(10).limit(5)
```

## Astuces

1. Pour quitter le shell MongoDB :
```bash
exit
```

2. Pour effacer l'écran :
```bash
cls
```

3. Pour voir l'aide :
```bash
help
```

En résumé, **MongoDB est super flexible** par rapport à SQL. Une fois que tu comprends ses concepts de base, tu pourras gérer des données complexes facilement. 😎 Si tu veux pratiquer, dis-moi ce que tu veux coder, et on le fait ensemble ! 🚀