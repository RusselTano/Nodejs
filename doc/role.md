Pour **créer des utilisateurs** dans MongoDB et leur attribuer des rôles spécifiques, vous devez utiliser la **commande `db.createUser()`** dans le shell MongoDB (`mongosh` ou `mongo`).

Voici les étapes à suivre :

---

### **1. Démarrer MongoDB et se connecter au shell**
1. Assurez-vous que le serveur MongoDB tourne en arrière-plan avec `mongod.exe`.
2. Ouvrez `mongosh` ou `mongo` pour accéder au shell :
   ```bash
   mongosh
   ```

3. **Accédez à la base de données** où vous souhaitez créer l'utilisateur. Par exemple, `admin` :
   ```javascript
   use admin
   ```

---

### **2. Créer un utilisateur avec `db.createUser`**

La syntaxe générale est la suivante :

```javascript
db.createUser({
  user: "nomUtilisateur",
  pwd: "motDePasse",
  roles: [
    { role: "nomDuRole", db: "nomDeLaBaseDeDonnees" }
  ]
})
```

#### **Exemple 1 : Créer un administrateur global**
L'utilisateur aura un accès administrateur complet :
```javascript
db.createUser({
  user: "adminUser",
  pwd: "securePassword123",
  roles: [ { role: "root", db: "admin" } ]
})
```

---

#### **Exemple 2 : Créer un utilisateur pour une base de données spécifique**
Ici, l'utilisateur a un accès en lecture et écriture uniquement sur une base de données appelée `myAppDB` :
```javascript
use myAppDB

db.createUser({
  user: "appUser",
  pwd: "password123",
  roles: [ { role: "readWrite", db: "myAppDB" } ]
})
```

---

#### **Exemple 3 : Créer un utilisateur en lecture seule**
Un utilisateur avec uniquement des droits de lecture sur une base de données nommée `reportsDB` :
```javascript
use reportsDB

db.createUser({
  user: "readUser",
  pwd: "readOnlyPassword",
  roles: [ { role: "read", db: "reportsDB" } ]
})
```

---

### **3. Vérifier les utilisateurs créés**
Pour afficher les utilisateurs dans une base de données, utilisez la commande suivante :
```javascript
db.getUsers()
```

---

### **4. Rôles prédéfinis dans MongoDB**
Voici quelques rôles prédéfinis couramment utilisés dans MongoDB :

| **Rôle**          | **Description**                                          |
|--------------------|----------------------------------------------------------|
| `root`            | Accès administrateur complet (toutes les opérations).    |
| `read`            | Accès en lecture uniquement sur une base de données.     |
| `readWrite`       | Lecture et écriture sur une base de données.             |
| `dbAdmin`         | Gestion des bases de données (index, schémas, etc.).     |
| `userAdmin`       | Gestion des utilisateurs et rôles pour une base donnée.  |
| `clusterAdmin`    | Administration globale pour les déploiements en cluster. |

Pour voir tous les rôles disponibles, exécutez :
```javascript
use admin
db.getRoles({ showBuiltinRoles: true })
```

---

### **5. Tester l'authentification**
Pour tester l'utilisateur créé :
1. **Quittez le shell** avec `exit` ou `Ctrl + C`.
2. Reconnectez-vous avec les identifiants de l'utilisateur :
   ```bash
   mongosh -u "nomUtilisateur" -p "motDePasse" --authenticationDatabase "nomDeLaBase"
   ```

   Par exemple :
   ```bash
   mongosh -u "appUser" -p "password123" --authenticationDatabase "myAppDB"
   ```

---

### **Exemple complet récapitulatif :**

1. Créez un utilisateur `devUser` avec accès lecture/écriture sur `devDB` :
   ```javascript
   use devDB

   db.createUser({
     user: "devUser",
     pwd: "devPassword123",
     roles: [ { role: "readWrite", db: "devDB" } ]
   })
   ```

2. Testez la connexion :
   ```bash
   mongosh -u "devUser" -p "devPassword123" --authenticationDatabase "devDB"
   ```

---

Si vous avez besoin d'aide pour configurer l'authentification ou attribuer des rôles personnalisés, je suis là pour vous aider ! 😊