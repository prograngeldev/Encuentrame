import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Configuración de express
app.use(express.static('public'));

// Ruta home
app.get('/', async (req, res) => {
  // Hace la consulta a la API para solicitar informacion acerca de la ip del cliente en un bloque try...catch
  try {
    // Consulta a la API
    const response = await axios.get('https://ipinfo.io/json');
    const result = response.data;

    res.render('index.ejs', { dataUser: result });

  } catch (error) {

    // Si hay un error, lo muestra en consola y envia un mensaje al cliente
    console.error(error);
    res.status(error.response.status).send('Error al buscar la IP proporcionada.');

  }
});

// Levantamiento de server
app.listen(port, console.log(`Server is running on port ${port}`));