const express = require('express');
const Partido = require('../models/Partido');
const router = express.Router();

//Obter todos partido
router.get('/partidos', async (req, res) => {
  const partidos = await Partido.find();
  res.send(partidos);
});

//Inserir partidos
router.post('/partidos', async (req, res) => {
  const partido = new Partido({
    nome: req.body.nome,
    foto: req.body.foto
  });
  
  try {
      await partido.save();
      res.status(200).send(partido);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar partido' });
  }
});

//Obter um partido
router.get('/partidos/:id', async (req, res) => {
  try {
    const partido = await Partido.findOne({ _id: req.params.id });
    res.send(partido);
  } catch {
    res.status(404);
    res.send({ error: "Partido não encontrado!" });
  }
});

//Actualizar um partido
router.put('/partidos/:id', async (req, res) => {
  try {
    const partido = await Partido.findOne({ _id: req.params.id });
    
    if (req.body.nome) {
      partido.nome = req.body.nome;
    }
    
    if (req.body.foto) {
      partido.foto = req.body.foto;
    }

    await partido.save();
    res.send(partido);
  } catch {
    res.status(404);
    res.send({ error: "Partido não encontrado!" });
  }
});

//Eliminar um partido
router.delete('/partidos/:id', async (req, res) => {
  try {
    await Partido.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Partido não encontrado!" });
  }
});

module.exports = router;
