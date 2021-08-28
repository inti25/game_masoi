var express = require('express');
var router = express.Router();
var Game = require('../models/Game');
var Player = require('../models/Player');
var gameRepository = require('../repositories/gameRepository');
var userRepository = require('../repositories/userRepository');

router.post('/', async function(req, res, next) {
  var g = new Game();
  g.id = await gameRepository.createGameId();
  var phone_number = req.body.phone_number;
  var player = new Player();
  player.phone_number = phone_number;
  g.player.push(Object.assign({}, player));
  g.noHuman = req.body.noHuman;
  g.noWolf = req.body.noWolf;
  g.status = 0;
  g.history = 0;
  await gameRepository.create(Object.assign({}, g));
  await userRepository.setGameId(phone_number, g.id);
  res.send('respond with a resource' + JSON.stringify(g));
});

router.post('/addPlayer', async function(req, res, next) {
  var gid = req.body.gameId;
  var player = new Player();
  player.phone_number = req.body.phone_number;
  var g = await gameRepository.addPlayer(gid, player);
  await userRepository.setGameId(player.phone_number, gid);
  res.send('respond with a resource' + JSON.stringify(g));
});

module.exports = router;
