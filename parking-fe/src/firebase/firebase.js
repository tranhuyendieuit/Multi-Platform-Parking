// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBeBjUvSXzH_QZu0yLCkbtfPBxenJ5YGWs",
    authDomain: "parking-app-bf154.firebaseapp.com",
    projectId: "parking-app-bf154",
    storageBucket: "parking-app-bf154.appspot.com",
    messagingSenderId: "184850346660",
    appId: "1:184850346660:web:6ff1ed979e457b52386c31",
    measurementId: "G-BNDRRKC0TP",
    databaseURL: "https://parking-app-bf154-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
export {database, ref, push, onValue}