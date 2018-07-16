import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQ2DoKWEiVY1OdD7nLwQNI6reEBAJxzKs",
  authDomain: "tubescore-extension.firebaseapp.com",
  databaseURL: "https://tubescore-extension.firebaseio.com",
  projectId: "tubescore-extension",
  storageBucket: "tubescore-extension.appspot.com",
  messagingSenderId: "5556162393"
};

firebase.initializeApp(config);

export default firebase;