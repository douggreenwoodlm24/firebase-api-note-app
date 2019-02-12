import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyCnG0zyzL1U6UjgrmMtn58KCLR2hqn6zjQ",
  authDomain: "fir-reactor.firebaseapp.com",
  databaseURL: "https://fir-reactor.firebaseio.com",
  projectId: "fir-reactor",
  storageBucket: "fir-reactor.appspot.com",
  messagingSenderId: "832904237895"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
