// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQ2DoKWEiVY1OdD7nLwQNI6reEBAJxzKs",
  databaseURL:"https://tubescore-extension.firebaseio.com",
  storageBucket: "tubescore-extension.appspot.com"
};
firebase.initializeApp(config);


function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};