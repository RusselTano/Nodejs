const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Heure : ', Date.now());
  next();
});
router.get('/active', (req, res) => {
  res.send('les utilisateurs actifs');
});
router.get('/:id', (req, res) => {
  res.send('Un utilisateur');
});
router.post('/', (req, res) => {
  res.send('Créer un utilisateur');
});

module.exports = router;