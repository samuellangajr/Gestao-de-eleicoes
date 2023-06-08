const express = require('express');
const Eleitor = require('../models/Eleitor');
const router = express.Router();

router.get('/eleitores', async (req, res) => {
  const eleitores = await Eleitor.find();
  res.send(eleitores);
});

router.post('/eleitores', async (req, res) => {
  const { nome, bi, foto } = req.body;

  // Verificar se o número de BI já existe no banco de dados
  const eleitorExistente = await Eleitor.findOne({ bi });
  if (eleitorExistente) {
    return res.status(400).send({ error: 'Número de BI já cadastrado' });
  }

  const eleitor = new Eleitor({
    nome,
    bi,
    foto
  });

  try {
    await eleitor.save();
    res.send(eleitor);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar eleitor' });
  }
});

router.get('/eleitores/:id', async (req, res) => {
  try {
    const eleitor = await Eleitor.findOne({bi: req.params.id });
    res.send(eleitor);
  } catch {
    res.status(404);
    res.send({ error: "Eleitor não existe!" });
  }
});

router.put('/eleitores/:id', async (req, res) => {
  try {
    const eleitor = await Eleitor.findOne({ _id: req.params.id });
    
    if (req.body.nome) {
      eleitor.nome = req.body.nome;
    }
   
    if (req.body.bi) {
      eleitor.bi = req.body.bi;
    }

    if (req.body.foto) {
      eleitor.foto = req.body.foto;
    }

    await eleitor.save();
    res.send(eleitor);
  } catch {
    res.status(404);
    res.send({ error: "Eleitor não existe!" });
  }
});

router.delete('/eleitores/:id', async (req, res) => {
  try {
    await Eleitor.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Eleitor não existe!" });
  }
});


module.exports = router;
