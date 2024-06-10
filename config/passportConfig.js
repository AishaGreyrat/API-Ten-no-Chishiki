// config/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { obtenerConexion } = require('./conexion');

// Estrategia de autenticación local
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const connection = await obtenerConexion();
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE email = ?", [email]);
      connection.release();
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Correo o contraseña incorrecto' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Correo o contraseña incorrecto' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const connection = await obtenerConexion();
    const [rows] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    connection.release();
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
