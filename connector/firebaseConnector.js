var admin = require("firebase-admin");

var serviceAccount;
try {
  serviceAccount = require("../conf/intidevapp-firebase-adminsdk-p1529-206535dcf5.json");
} catch (e) {
  serviceAccount = {
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CLIENT_CERT
  };
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://intidevapp.firebaseio.com"
});

module.exports = admin.firestore();
