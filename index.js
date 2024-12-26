import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Configuración de express
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ruta home
app.get('/', async (req, res) => {
  // Hace la consulta a la API para solicitar informacion acerca de la ip del cliente en un bloque try...catch
  try {
    // Consulta a la API
    const response = await axios.get('https://ipinfo.io/json');
    const result = response.data;

    // Renderizado de la vista index.ejs con la respuesta de la servidor que contiene la API
    res.render('index.ejs', { dataUser: result });
  } catch (error) {

    if (error.response) {
        // Si el error tiene la propiedad response
        res.status(error.response.status).send(error.response.statusText);
    } else if (error.request) {
        // El servidor no respondió
        res.status(503).send('Error: No se obtuvo respuesta del servidor.');
    } else {
        // Error en la configuración de la solicitud
        res.status(500).send('Error: Fallo en la solicitud.');
    }
  }
});

// Ruta para buscar informacion de una IP
app.post('/search-ip', async (req, res) => {
    // IP enviada por el cliente
    const ip = req.body.ip;

    // Hace la consulta a la API para solicitar informacion acerca de la ip que el cliente envio en un bloque try...catch
    try {
        // Consulta a la API
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        const result = response.data;
    
        // Renderizado de la vista index.ejs con la respuesta de la servidor que contiene la API
        res.redirect(302, '/');
      } catch (error) {
    
        if (error.response) {
            // Si el error tiene la propiedad response
            res.status(error.response.status).send(error.response.statusText);
        } else if (error.request) {
            // El servidor no respondió
            res.status(503).send('Error: No se obtuvo respuesta del servidor.');
        } else {
            // Error en la configuración de la solicitud
            res.status(500).send('Error: Fallo en la solicitud.');
        }
      }
})

// Levantamiento de server
app.listen(port, console.log(`Server is running on port ${port}`));