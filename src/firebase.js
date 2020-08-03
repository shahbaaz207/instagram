import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyC_fUo9f-Bg7KEZ-Nm0xQ1SZXjXvo4Ptb0",
  authDomain: "instagram-clone-10caf.firebaseapp.com",
  databaseURL: "https://instagram-clone-10caf.firebaseio.com",
  projectId: "instagram-clone-10caf",
  storageBucket: "instagram-clone-10caf.appspot.com",
  messagingSenderId: "359510111152",
  appId: "1:359510111152:web:bc71845a0a7e2e849cdc75",
  measurementId: "G-GH6VMH9DCD"
};
// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
 const db=firebaseApp.firestore()
const auth=firebase.auth()
const storage=firebase.storage()
 export  {auth,storage,db}