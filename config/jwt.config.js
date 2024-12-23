const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { app } = require("../app");
const { findUserPerId } = require("../queries/user.querie");

exports.createJwtToken = (user) => {
  return jwt.sign({ sub: user._id.toString() }, JWT_SECRET);
};

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        // delete the token
        res.clearCookie("jwt");
        res.redirect("/auth/signin/form");
      }
    } catch (error) {
      res.clearCookie("jwt");
      res.redirect("/auth/signin/form");
    }
  } else {
    next();
  }
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie("jwt");
  req.login = (user) => {
    const token = exports.createJwtToken(user);
    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/");
  };
  next();
};

exports.decodeJwtToken = (token) => {
  return jwt.decode(token);
};

exports.verifyJwtToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
/**
 * jwt.sign(payload, secretOrPrivateKey, [options, callback]).
 * Un MAC s'obtient en créant une clé secrète avec un algorithme :
 * H(message, secret) = MAC, avec H une fonction de hachage.
 * Les claims enregistrés sont recommandées mais non obligatoires :

"iss" (Issuer) Claim : identifiant du service ayant créé le token.

"sub" (Subject) Claim : identifiant unique de l'utilisateur du token.

"aud" (Audience) Claim : identifiants, souvent au format tableau, des serveurs de ressource destinataires du token.

"exp" (Expiration Time) Claim : date et heure de expiration du token.

"nbf" (Not Before) Claim : date et heure avant laquelle le token ne doit plus fonctionner.

"iat" (Issued At) Claim : date et heure de création du token.

"jti" (JWT ID) Claim : identifiant unique du token.

un jwt comprend trois parties : un header (en rouge), un payload (ou contenu, en mauve) et une signature (en bleu).
Le payload contient généralement l'id de l'utilisateur, la date d'expiration du token et des permissions dans un scope.
*/
