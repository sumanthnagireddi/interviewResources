import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_y_0iJAjkfcgsSIawGrcIOIPvF19sxi4",
    authDomain: "sumanthnagireddi-interview.firebaseapp.com",
    projectId: "sumanthnagireddi-interview",
    storageBucket: "sumanthnagireddi-interview.appspot.com",
    messagingSenderId: "690782833147",
    appId: "1:690782833147:web:85e61606f3f76fe1b7a35e",
    measurementId: "G-S8V59ELZD2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db