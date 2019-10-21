// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDjtAJc_eaDcFCm_9eJ0etBepEGmjcH2U",
    authDomain: "party-626c8.firebaseapp.com",
    databaseURL: "https://party-626c8.firebaseio.com",
    projectId: "party-626c8",
    storageBucket: "party-626c8.appspot.com",
    messagingSenderId: "769891590862",
    appId: "1:769891590862:web:bfe9d857b49c909c39269f",
    measurementId: "G-RPXPTHZ681"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
