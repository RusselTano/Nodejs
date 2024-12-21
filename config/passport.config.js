const passport = require("passport");
const { app } = require("../app");
const User = require("../database/models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const {findUserPerEmail} = require("../queries/user.querie");

app.use(passport.initialize());
app.use(passport.session());

// La méthode passport.serialize() sert à spécifier l'identifiant unique relatif au user stocké dans l'objet session dans la base de données, et qui sera utilisé par la méthode deserialize() pour le récupérer   
passport.serializeUser((user, done) => {
  done(null, user.id); // stocke id de l'utilisateur
});

passport.deserializeUser(async (id, done) => {
  // recupere l'utilisateur stocké grâce a son id
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await findUserPerEmail(email);
    if(user){
      const match = await user.comparePassword(password);
      if(match){
        return done(null, user);
      }
      else{
        return done(null, false, { message: 'mot de passe incorrect' });
      }
    }
    else{
      return done(null, false, { message: 'email incorrect' });
    }
  } catch (err) {
    return done(err);
  }
}));