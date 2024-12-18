const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose
  .connect("mongodb://didicode:123@127.0.0.1:27017/devDB")
  .then(() => {
    console.log("✅ Connecté à MongoDB avec succès!");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err.message);
  });

// Définition des Schemas
const coursesSchema = schema({
  name: String,
  description: String,
});
const studentSchema = schema({
  name: String,
  email: String,
  password: String,
  courses: { type: [coursesSchema], default: [] },
});

// Création du modeèle
const Student = mongoose.model("Student", studentSchema);

// Création d'un nouvel utilisateur
const student = new Student({
  name: "John Doe",
  email: "h3d0m@example.com",
  password: "password123",
  courses: [
    { name: "JavaScript", description: "Cours de JS" },
    { name: "Node.js", description: "Cours de Node" },
  ],
});

Student.findOne({ email: student.email })
  .then((studentFound) => {
    if (studentFound) {
      console.log("❌ Erreur, l'utilisateur existe déjà!");
    } else {
      return student
        .save()
        .then(() => {
          console.log("✅ Utilisateur enregistré avec succès!");
        })
        .catch((err) => {
          console.error(
            "❌ Erreur lors de l'enregistrement de l'utilisateur:",
            err
          );
        });
    }
  })
  .catch((err) => {
    console.error("❌ Erreur lors de la recherche de l'utilisateur:", err);
  });

console.log("🚀 Serveur en cours d'execution...");

Student.findOne({ email: student.email })
  .then((studentFound) => {
    if (studentFound) {
      console.log("✅ Utilisateur trouvé:", studentFound);
    } else {
      console.log("❌ Utilisateur non trouvé");
    }
  })
  .catch((err) => {
    console.error("❌ Erreur lors de la recherche de l'utilisateur:", err);
  });

/**
 * connection classique
 * mongoose.connect('mongodb://127.0.0.1:27017/devDB');
 * ou
 * connectionn avec le user et le password
 * mongoose.connect('mongodb://devUser:devPassword@localhost:27017/devDB');
 * {
  _id: 'devDB.didicode',
  userId: UUID('a906a5e7-256a-4d9a-9e7a-c2f824d901f4'),
  user: 'didicode',
  db: 'devDB',
  roles: [ { role: 'readWrite', db: 'devDB' } ],
  mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
}
  const uri = 'mongodb://<your_user>:<your_password>@<your_host>:<your_port>/ma_base';

   */

/**
Les méthodes disponibles sur les Query
La méthode sort()
La méthode skip()
La méthode limit()
Chaîner les méthodes
 */
