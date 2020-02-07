import firebase from "firebase/app";
import "firebase/database";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCYq8IE7Q_7Mr8jq4GSehmF9zqXDyub0zA",
  authDomain: "microfinance-cab4b.firebaseapp.com",
  databaseURL: "https://microfinance-cab4b.firebaseio.com",
  projectId: "microfinance-cab4b",
  storageBucket: "microfinance-cab4b.appspot.com",
  messagingSenderId: "814835183992",
  appId: "1:814835183992:web:09791f4a233f4b837fd88d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
