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
const coursesSchema = schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);
const Courses = mongoose.model("Courses", coursesSchema);

const studentSchema = schema(
  {
    name: String,
    email: String,
    password: String,
    courses: [{ type: schema.Types.ObjectId, ref: "Courses" }],
  },
  {
    timestamps: true,
  }
);

// Création du modeèle
const Student = mongoose.model("Student", studentSchema);
// Création d'un nouvel etudiant
const student = new Student({
  name: "John Doe",
  email: "h3d0m@example.com",
  password: "password123",
  // courses: [
  //   { name: "JavaScript", description: "Cours de JS" },
  //   { name: "Node.js", description: "Cours de Node" },
  // ],
});

const course = new Courses({
  name: "JavaScript",
  description: "Cours de JS",
});

course
  .save()
  .then((course) => {
    console.log("✅ Cours enregistré avec succès!");
    student.courses.push(course._id); // On ajoute l'ID du cours
    return student.save(); // On sauvegarde l'étudiant avec le nouveau cours
  })
  .then(() => {
    console.log("✅ Etudiant mis à jour avec succès!");
    // Pour vérifier que tout est bien enregistré, on peut faire une requête avec populate
    return Student.findOne({ email: student.email }).populate("courses");
  })
  .then((populatedStudent) => {
    console.log("Étudiant avec ses cours :", populatedStudent);
  })
  .catch((err) => {
    console.error("❌ Erreur lors de l'opération:", err);
  });

Student.findOne({ email: student.email })
  .then((studentFound) => {
    if (studentFound) {
      console.log("❌ Erreur, l'etudiant existe déjà!");
    } else {
      return student
        .save()
        .then(() => {
          console.log("✅ Etudiant enregistré avec succès!");
        })
        .catch((err) => {
          console.error(
            "❌ Erreur lors de l'enregistrement de l'etudiant:",
            err
          );
        });
    }
  })
  .catch((err) => {
    console.error("❌ Erreur lors de la recherche de l'etudiant:", err);
  });

console.log("🚀 Serveur en cours d'execution...");

// Student.findOne({ email: student.email })
//   .then((studentFound) => {
//     if (studentFound) {
//       console.log("✅ etudiant trouvé:", studentFound);
//     } else {
//       console.log("❌ etudiant non trouvé");
//     }
//   })
//   .catch((err) => {
//     console.error("❌ Erreur lors de la recherche de l'etudiant:", err);
//   });

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

/*
 * Les méthodes d'instance sont des méthodes accessibles directement sur les Documents qui proviennent du Schema sur lequel la méthode d'instance est déclarée.
 * Les méthodes statiques sont des méthodes accessibles sur le Model utilisant le Schema sur lequel sont déclarées ces méthodes avec schema.statics.<methode>.
 * 
 */

/**
 * const personSchema = new Schema({
    contact: {
      prenom: String,
      nom: String,
      email: String,
      tel: String
    }
  });
  const Person = mongoose.model('Person', personSchema);

  personSchema.virtual('nomComplet').get(function() {
    return `${this.contact.prenom} ${this.contact.nom}`;
  });

  const someone = new Person({
    contact: { prenom: 'Paul', nom: 'Dupont' }
  });

  console.log(someone.nomComplet); // 'Paul Dupont'

  personSchema.virtual('nomComplet').
    get(function() { return `${this.contact.prenom} ${this.contact.nom}`; }).
    set(function(v) {
      this.contact.prenom = v.substr(0, v.indexOf(' '));
      this.contact.nom = v.substr(v.indexOf(' ') + 1);
    });

  someone.nomComplet = 'Paul Dupont'; // va définir contact.prenom et contact.nom
 */