const express = require('express');
const Eleitor = require('../models/Eleitor');
const Voto = require('../models/Voto');
const Partido = require('../models/Partido');
const Candidato = require('../models/Candidato');

const router = express.Router();

// Rota para obter todos os votos
router.get('/votos', async (req, res) => {
    try {
      const votos = await Voto.find();
      res.send(votos);
    } catch (error) {
      res.status(500).send({ error: 'Ocorreu um erro ao obter os votos.' });
    }
  });

// Rota para registrar um voto em um partido e candidato
router.post('/votar', async (req, res) => {
  const { eleitorId, partidoId, candidatoId } = req.body;
    
    // Verificar se o eleitor já votou
    const votoExistente = await Voto.findOne({eleitorId});
    if (votoExistente) {
      res.status(400).send({ error: 'Você já votou anteriormente.' });
      return;
    } 
    const voto = new Voto({
      eleitorId,
      partidoId,
      candidatoId,
    });

  try { 
    // Registrar o voto na base de dados
    await voto.save();

    res.status(200).send({ message: 'Voto registrado com sucesso.' });
  } catch (error) {
    res.status(500).send({ error: 'Ocorreu um erro ao registrar o voto.' });
  }
});


// Rota para obter o relatório de votos
router.get('/relatorio-votos', async (req, res) => {
  try {
    // Obter todos os votos
    const votos = await Voto.find();

    // Calcular o total de votos por partido e candidato
    const votosPorPartido = {};
    const votosPorCandidato = {};

    for (const voto of votos) {
      const partidoId = voto.partidoId;
      const candidatoId = voto.candidatoId;

      // Contar os votos por partido
      if (!votosPorPartido[partidoId]) {
        votosPorPartido[partidoId] = 1;
      } else {
        votosPorPartido[partidoId]++;
      }

      // Contar os votos por candidato
      if (!votosPorCandidato[candidatoId]) {
        votosPorCandidato[candidatoId] = 1;
      } else {
        votosPorCandidato[candidatoId]++;
      }
    }

    // Encontrar o partido vencedor
    let partidoVencedor = '';
    let votosPartidoVencedor = 0;
    for (const partidoId in votosPorPartido) {
      const totalVotosPartido = votosPorPartido[partidoId];

      if (totalVotosPartido > votosPartidoVencedor) {
        partidoVencedor = partidoId;
        votosPartidoVencedor = totalVotosPartido;
      }
    }

    // Encontrar o candidato vencedor
    let candidatoVencedor = '';
    let votosCandidatoVencedor = 0;
    for (const candidatoId in votosPorCandidato) {
      const totalVotosCandidato = votosPorCandidato[candidatoId];

      if (totalVotosCandidato > votosCandidatoVencedor) {
        candidatoVencedor = candidatoId;
        votosCandidatoVencedor = totalVotosCandidato;
      }
    }

    // Calcular as porcentagens de votos
    const totalVotos = votos.length;
    const percentualPartidoVencedor = ((votosPartidoVencedor / totalVotos) * 100).toFixed(2);
    const percentualCandidatoVencedor = ((votosCandidatoVencedor / totalVotos) * 100).toFixed(2);

    // Obter o nome do partido vencedor
    const partidoVencedorObj = await Partido.findById(partidoVencedor);
    const nomePartidoVencedor = partidoVencedorObj.nome;

    // Obter o nome do candidato vencedor
    const candidatoVencedorObj = await Candidato.findById(candidatoVencedor);
    const nomeCandidatoVencedor = candidatoVencedorObj.nome;

    // Obter os dados dos outros partidos
    const outrosPartidos = [];
    for (const partidoId in votosPorPartido) {
      if (partidoId !== partidoVencedor) {
        const partidoObj = await Partido.findById(partidoId);
        const nomePartido = partidoObj.nome;
        const totalVotosPartido = votosPorPartido[partidoId];
        const percentualVotosPartido = ((totalVotosPartido / totalVotos) * 100).toFixed(2);

        outrosPartidos.push({
          nome: nomePartido,
          votos: totalVotosPartido,
          percentual: percentualVotosPartido
        });
      }
    }

    // Obter os dados dos outros candidatos
    const outrosCandidatos = [];
    for (const candidatoId in votosPorCandidato) {
      if (candidatoId !== candidatoVencedor) {
        const candidatoObj = await Candidato.findById(candidatoId);
        const nomeCandidato = candidatoObj.nome;
        const totalVotosCandidato = votosPorCandidato[candidatoId];
        const percentualVotosCandidato = ((totalVotosCandidato / totalVotos) * 100).toFixed(2);

        outrosCandidatos.push({
          nome: nomeCandidato,
          votos: totalVotosCandidato,
          percentual: percentualVotosCandidato
        });
      }
    }

    // Criar o relatório de votos
    const relatorioVotos = {
      partidoVencedor: {
        nome: nomePartidoVencedor,
        votos: votosPartidoVencedor,
        percentual: percentualPartidoVencedor
      },
      candidatoVencedor: {
        nome: nomeCandidatoVencedor,
        votos: votosCandidatoVencedor,
        percentual: percentualCandidatoVencedor
      },
      outrosPartidos: outrosPartidos,
      outrosCandidatos: outrosCandidatos
    };

    res.send(relatorioVotos);
  } catch (error) {
    res.status(500).send({ error: 'Ocorreu um erro ao obter o relatório de votos.' });
  }
});


module.exports = router;
