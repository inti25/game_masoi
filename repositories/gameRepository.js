var dbConnector = require('../connector/firebaseConnector');
var GameCollector = dbConnector.collection('game');
var Game = require('../models/Game');
function GameRepository() {}

GameRepository.prototype.createGameId = async function() {
  return GameCollector.doc().id;
}

GameRepository.prototype.create = async function(game) {
  console.log(Object.assign({}, game));
  await GameCollector.doc(game.id).set(Object.assign({}, game));
}

GameRepository.prototype.addPlayer = async function(gameId, player) {
  var game = GameCollector.doc(gameId).get();
  var g = new Game();
  g = (await game).data();
  if (g.player.length >= (g.noWolf + g.noHuman)) {
    throw 'room full'
  }
  console.log('before filter', g.player , g.player.length);
  let p = await g.player.filter(value => {
    return value.phone_number === player.phone_number;
  })
  console.log('after filter', p , p.length);
  if (p.length > 0) {
    throw 'player in game'
  }
  g.player.push(Object.assign({}, player));
  await GameCollector.doc(gameId).set(Object.assign({}, g));
  return g;
}

GameRepository.prototype.getAll = async function() {
  let response = [];
  const snapshot = await UserCollector.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    response.push(doc.data());
  });
  return response;
}
module.exports = new GameRepository();
