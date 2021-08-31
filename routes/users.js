var express = require('express');
var userRepo = require('../repositories/userRepository')
var User = require('../models/User')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var users = await userRepo.getAll();
  res.send(JSON.stringify(users));
});

router.post('/getByPhone', async function(req, res, next) {
  var phone = req.body.phone_number;
  var user = await userRepo.getByPhone(phone);
  console.log('user', user);
  if (user === null) {
    res.send({"error" : "USER_NOT_FOUND"});
  } else {
    res.send(JSON.stringify(user));
  }
});

router.post('/', async function(req, res, next) {
   var user = new User();
   user.name = req.body.name;
   user.phone_number = req.body.phone_number;
   user.email = req.body.email;
   try {
     await userRepo.add(user);
     res.send(JSON.stringify(user));
   } catch (e) {
     res.send({"error" : e.message});
   }

});

module.exports = router;
