const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const passport = require('./config/passportConfig'); // Importar la configuración de Passport
const MySQLStore = require('express-mysql-session')(session);
const auth = require('./middlewares/authMiddleware');

// Configurar DotEnv
dotenv.config();

app.use(cookieParser());
app.use(flash());

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos para almacenar sesiones
const sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Añadir el usuario autenticado a las variables locales
app.use(auth.addUserToLocals);

// Rutas
const router = require('./routes/routes');
app.use('/', router);

// Puerto en el que escucha el servidor 
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});