import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, query } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"
export default class MSFrontEndService {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBdpEqgt-5tjhQ74ZvB8-mCJ_xiCzx6b5w",
      authDomain: "intidevapp.firebaseapp.com",
      databaseURL: "https://intidevapp.firebaseio.com",
      projectId: "intidevapp",
      storageBucket: "intidevapp.appspot.com",
      messagingSenderId: "824906287186",
      appId: "1:824906287186:web:71256fe4995ddbd22eb78b"
    };
    // Initialize Firebase
    initializeApp(firebaseConfig);
    this.db = getFirestore();
    this.gameListener = null;
  }

  subscribeListGame(callback) {
    const q = query(collection(this.db, "game"));
    this.gameListener = onSnapshot(q, (querySnapshot) => {
      const games = [];
      querySnapshot.forEach((doc) => {
        games.push(doc.data());
      });
      callback(games);
    });
  }

  unsubscribeListGame() {
    if (this.gameListener) this.gameListener();
  }

  async getGameList() {
    const querySnapshot = await getDocs(collection(this.db, "game"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
    });
  }
}
