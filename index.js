import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Configuración de express
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Arreglo para almacenar la informacion de la IP buscada
const dataFromIP = [];

// Ruta home
app.get('/', async (req, res) => {
  // Hace la consulta a la API para solicitar informacion acerca de la ip del cliente en un bloque try...catch
  try {
    // Consulta a la API
    const response = await axios.get('https://ipinfo.io/json');
    const result = response.data;

    // Verifica si hay informacion de la IP en la variable dataFromIP
    const ipData = dataFromIP.length > 0 ? dataFromIP[0] : null;

    // Limpia el arreglo para que no hayan datos
    dataFromIP.length = 0;

    res.render('index.ejs', {
        dataUser: result,
        dataIP: ipData,
    });

  } catch (error) {

    // Si hay un error, lo muestra en consola y envia un mensaje al cliente
    console.error(error);
    res.status(error.response.status).send('Error al buscar la IP proporcionada.');

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

        // Limpia el arreglo para que no hayan datos
        dataFromIP.length = 0;

        // Agrega la informacion de la IP a la variable dataFromIP
        dataFromIP.push({
            ip: result.ip,
            city: result.city,
            region: result.region,
            country: result.country,
            loc: result.loc,
        });
    
        // Redirecciona al home
        res.redirect(302, '/');
      } catch (error) {

        // Si hay un error, lo muestra en consola y envia un mensaje al cliente
        console.error(error);
        res.status(error.response.status).send('Error al buscar la IP proporcionada.');

      };
})

// Levantamiento de server
app.listen(port, console.log(`Server is running on port ${port}`));