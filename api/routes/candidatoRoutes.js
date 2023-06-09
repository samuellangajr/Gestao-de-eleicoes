const express = require('express');
const Candidato = require('../models/Candidato');
const router = express.Router();

//Obter todos candidatos
router.get('/candidatos', async (req, res) => {
  const candidatos = await Candidato.find();
  res.send(candidatos);
});

//Inserir canditados
router.post('/candidatos', async (req, res) => {
  const candidato = new Candidato({
    nome: req.body.nome,
    partido: req.body.partido,
    foto: req.body.foto
  });
 
  try {
    await candidato.save();
    res.status(200).send(candidato);
  } catch (error) {
  res.status(500).send({ error: 'Erro ao criar candidato' });
  }
});

//obter um candidato
router.get('/candidatos/:id', async (req, res) => {
  try {
    const candidato = await Candidato.findOne({ _id: req.params.id });
    res.send(candidato);
  } catch {
    res.status(404);
    res.send({ error: "Candidato não existe!" });
  }
});

//Mudar dados do candidato
router.put('/candidatos/:id', async (req, res) => {
  try {
    const candidato = await Candidato.findOne({ _id: req.params.id });
    
    if (req.body.nome) {
      candidato.nome = req.body.nome;
    }
   
    if (req.body.partido) {
      candidato.partido = req.body.partido;
    }

    if (req.body.foto) {
      candidato.foto = req.body.foto;
    }

    await candidato.save();
    res.send(candidato);
  } catch {
    res.status(404);
    res.send({ error: "Candidato não existe!" });
  }
});

//Eliminar um candidato
router.delete('/candidatos/:id', async (req, res) => {
  try {
    await Candidato.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Candidato não existe!" });
  }
});

module.exports = router;
