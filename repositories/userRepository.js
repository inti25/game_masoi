var dbConnector = require('../connector/firebaseConnector');
var UserCollector = dbConnector.collection('user');
function UserRepository() {}

/**
 * Create register stage
 * @param {User} user
 */
UserRepository.prototype.add = async function(user) {
  return await UserCollector.doc(user.phone_number).set(Object.assign({}, user));
}

/**
 * Create register stage
 * @param {String} phone_number
 * @param {String} gameId
 */
UserRepository.prototype.setGameId = async function(phone_number, gameId) {
  var userdoc = UserCollector.doc(phone_number).get();
  let user = (await userdoc).data();
  user.gameId = gameId;
  UserCollector.doc(user.phone_number).set(Object.assign({}, user));
}

/**
 * Create register stage
 * @param {String} phone_number
 */
UserRepository.prototype.getByPhone = async function(phone_number) {
  let user = await UserCollector.doc(phone_number).get();
  if (!user.exists) {
    return null;
  } else {
    console.log('userDATA: ', user.data());
    return user.data();
  }
}

UserRepository.prototype.getAll = async function() {
  let response = [];
  const snapshot = await UserCollector.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    response.push(doc.data());
  });
  return response;
}
var userRepository = new UserRepository();
module.exports = userRepository;
