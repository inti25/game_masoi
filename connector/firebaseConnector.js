var admin = require("firebase-admin");

var serviceAccount = require("../conf/intidevapp-firebase-adminsdk-p1529-206535dcf5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://intidevapp.firebaseio.com"
});

module.exports = admin.firestore();
