const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Configura la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'nombre_de_tu_base_de_datos'
});

// Conéctate a la base de datos MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar la creación de usuarios
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.query(INSERT_USER_QUERY, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el usuario');
    }
    console.log('Usuario creado exitosamente');
    res.status(200).send('Usuario creado exitosamente');
  });
});

// Ruta para manejar el inicio de sesión de usuarios
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  const SELECT_USER_QUERY = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(SELECT_USER_QUERY, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al iniciar sesión');
    }
    if (result.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    console.log('Inicio de sesión exitoso');
    res.status(200).send('Inicio de sesión exitoso');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
