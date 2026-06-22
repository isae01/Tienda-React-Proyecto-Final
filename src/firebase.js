import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de mi proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDH3AM7KljW3re_tXrK8sLCH-RCjpFxDis",
  authDomain: "tienda-react-a9b0c.firebaseapp.com",
  projectId: "tienda-react-a9b0c",
  storageBucket: "tienda-react-a9b0c.firebasestorage.app",
  messagingSenderId: "17979153903",
  appId: "1:17979153903:web:ca97dab0c484f20ddd6a1a",
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Creamos conexión con Firestore
export const db = getFirestore(app);
