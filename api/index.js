const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eleitorRoutes = require('./routes/eleitorRoutes');
const candidatoRoutes = require('./routes/candidatoRoutes');
const partidoRoutes = require('./routes/partidoRoutes');
const votoRoutes = require('./routes/votoRoutes');

mongoose
  .connect('mongodb://127.0.0.1:27017/Eleicao', { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api', eleitorRoutes);
    app.use('/api', candidatoRoutes);
    app.use('/api', partidoRoutes);
    app.use('/api', votoRoutes);

    app.listen(5000, () => {
      console.log('Server listening on port 5000');
    });
  });
