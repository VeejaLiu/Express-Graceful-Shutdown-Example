const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/test', async (req, res) => {
  try {
    const {i} = req.body;

    // Request received
    console.log(`[${new Date().toISOString()}][${i} -> Received]`);

    // After five seconds, a response will be returned
    await setTimeout(async function () {
      console.log(`[${new Date().toISOString()}][${i}] -> Done!!!`);
      res.send(`${i}`).status(201);
    }, 5000);

  } catch (err) {
    res.send(err.message).status(500);
  }
});

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

/**
 * When receiving the termination signal, the server will be shut down first,
 * and the service will not be shut down until all stock requests are processed.
 */
process.on('SIGTERM', () => {

  console.info('SIGTERM signal received.');
  console.log('Closing http server.');

  server.close(() => {
    console.log('Http server closed.');
  });

})