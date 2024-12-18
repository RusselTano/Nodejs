Super idée de passer à MongoDB ! 😎 Puisque tu as déjà des notions en SQL, on va utiliser ce que tu connais pour te montrer comment MongoDB fonctionne. C’est parti ! 🚀

---

## **1. MongoDB, c’est quoi ?**
MongoDB est une **base de données NoSQL**, ce qui signifie qu’elle est orientée documents, et non relationnelle comme SQL. Les données sont stockées dans des **documents JSON** (ou BSON, qui est juste une version binaire de JSON). Il n’y a pas de **tables**, mais des **collections**.

---

## **2. Comparaison SQL vs MongoDB**
Voici les concepts principaux de SQL et leurs équivalents en MongoDB :

| **SQL**                | **MongoDB**                  | **Explication**                                                                 |
|------------------------|-----------------------------|---------------------------------------------------------------------------------|
| Base de données        | Base de données             | Pas de changement ici, c’est la même idée.                                      |
| Table                  | Collection                  | Une **collection** contient des documents (équivalent des lignes en SQL).       |
| Ligne                  | Document                    | Un **document** est une structure JSON qui contient les données.                |
| Colonne                | Champ (ou clé)              | Les **champs** (ou clés) dans MongoDB sont comme les colonnes en SQL.           |
| Clé primaire           | `_id` (automatique)         | Chaque document a un champ **_id** unique, généré automatiquement.              |
| Jointures              | Embedding ou Référencement  | MongoDB gère les relations différemment. On y revient dans un instant.          |
| SQL Query (`SELECT`)   | `find()`                    | Les requêtes en MongoDB se font en JSON avec la méthode `find()`.                |

---

## **3. Structure des données en MongoDB**
En SQL, les données sont normalisées (on sépare tout dans différentes tables). En MongoDB, on peut :
- **Imbriquer** les données directement dans un document (embedding).
- Ou faire des références entre documents (similaire aux relations SQL).

### **Exemple SQL :**
Tu as une base de données pour un blog avec deux tables :
- Une table `users` :
  ```sql
  CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
  );
  ```
- Une table `posts` :
  ```sql
  CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  ```

### **En MongoDB :**
#### Option 1 : **Embedding** (tout dans un document)
Un utilisateur et ses articles peuvent être imbriqués dans un seul document :
```json
{
  "_id": 1,
  "name": "Alice",
  "posts": [
    { "id": 101, "content": "Premier article" },
    { "id": 102, "content": "Deuxième article" }
  ]
}
```

#### Option 2 : **Référencement** (comme une jointure)
Tu peux séparer `users` et `posts` dans deux collections :
- Collection `users` :
  ```json
  { "_id": 1, "name": "Alice" }
  ```
- Collection `posts` :
  ```json
  { "_id": 101, "user_id": 1, "content": "Premier article" }
  ```

---

## **4. Requêtes courantes : SQL vs MongoDB**
### **Créer une base de données**
- **SQL :**
  ```sql
  CREATE DATABASE blog;
  ```
- **MongoDB :**
  ```js
  use blog;
  ```

### **Créer une collection / table**
- **SQL :**
  ```sql
  CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
  ```
- **MongoDB :** (les collections sont créées automatiquement quand on insère un document)
  ```js
  db.users.insertOne({ _id: 1, name: "Alice" });
  ```

### **Insérer des données**
- **SQL :**
  ```sql
  INSERT INTO users (id, name) VALUES (1, 'Alice');
  ```
- **MongoDB :**
  ```js
  db.users.insertOne({ _id: 1, name: "Alice" });
  ```

### **Lire les données**
- **SQL :**
  ```sql
  SELECT * FROM users WHERE id = 1;
  ```
- **MongoDB :**
  ```js
  db.users.find({ _id: 1 });
  ```

### **Mettre à jour les données**
- **SQL :**
  ```sql
  UPDATE users SET name = 'Bob' WHERE id = 1;
  ```
- **MongoDB :**
  ```js
  db.users.updateOne({ _id: 1 }, { $set: { name: "Bob" } });
  ```

### **Supprimer des données**
- **SQL :**
  ```sql
  DELETE FROM users WHERE id = 1;
  ```
- **MongoDB :**
  ```js
  db.users.deleteOne({ _id: 1 });
  ```

---

## **5. Les relations en MongoDB**
En SQL, les relations se font avec des **clé étrangères** et des **jointures**. En MongoDB, tu as deux approches principales :

### **1. Embedding (Imbrication)**
- **Quand l’utiliser ?**
  - Les données sont étroitement liées (par exemple, un utilisateur et ses adresses).
- **Avantage :**
  - Plus rapide, car tout est dans un seul document.
- **Inconvénient :**
  - Peut devenir lourd si les données imbriquées sont nombreuses.

### **2. Référencement**
- **Quand l’utiliser ?**
  - Les données sont indépendantes et peuvent être réutilisées (par exemple, un utilisateur et ses commandes).
- **Avantage :**
  - Plus flexible et réduit la duplication des données.
- **Inconvénient :**
  - Nécessite plusieurs requêtes (ou un traitement côté application) pour les "jointures".

---

## **6. Bonus : Les requêtes avancées en MongoDB**
MongoDB permet de faire des requêtes complexes sans "jointures" SQL grâce à des **opérateurs**. En voici quelques-uns :

- **Filtrage :**
  ```js
  db.users.find({ age: { $gt: 18 } }); // age > 18
  ```

- **Projection (colonnes spécifiques) :**
  ```js
  db.users.find({}, { name: 1, age: 1 }); // Affiche uniquement name et age
  ```

- **Agrégation (GROUP BY en SQL) :**
  ```js
  db.orders.aggregate([
    { $group: { _id: "$user_id", total: { $sum: "$amount" } } }
  ]);
  ```

---

En résumé, **MongoDB est super flexible** par rapport à SQL. Une fois que tu comprends ses concepts de base, tu pourras gérer des données complexes facilement. 😎 Si tu veux pratiquer, dis-moi ce que tu veux coder, et on le fait ensemble ! 🚀