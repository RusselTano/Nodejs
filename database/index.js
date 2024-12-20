const mongoose = require("mongoose");

/**
 * Configuration de la connexion MongoDB
 * @type {Object}
 */
const MONGODB_CONFIG = {
  url: "mongodb://didicode:123@127.0.0.1:27017/devDB",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

/**
 * Établit la connexion à MongoDB
 * @returns {Promise<void>}
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_CONFIG.url, MONGODB_CONFIG.options);
    console.log(`✅ Connecté à MongoDB avec succès! [${new Date().toLocaleString()}]`);
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB:", err.message);
    process.exit(1);  // Arrête l'application en cas d'échec de connexion
  }
}

// Gestion des événements de connexion MongoDB
mongoose.connection.on('error', err => {
  console.error('❌ Erreur MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Déconnecté de MongoDB');
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Connexion MongoDB fermée suite à l\'arrêt de l\'application');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de la fermeture de la connexion:', err);
    process.exit(1);
  }
});

// Initialise la connexion
connectToDatabase();
