import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Login({ setUserId, setView }) {
  const [email, setEmail] = useState("");

  const login = async () => {
    if (email.trim() === "") {
      alert("Ingrese un correo");
      return;
    }

    const usersRef = collection(db, "usuarios");
    const q = query(usersRef, where("email", "==", email));
    const result = await getDocs(q);

    if (!result.empty) {
      const userDoc = result.docs[0];

      localStorage.setItem("userId", userDoc.id);
      setUserId(userDoc.id);
      setView("products");
    } else {
      const newUser = await addDoc(usersRef, {
        email: email,
      });

      localStorage.setItem("userId", newUser.id);
      setUserId(newUser.id);
      setView("products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Bienvenida
        </h1>

        <p className="text-slate-500 text-center mt-2">
          Ingresa tu correo para entrar a la tienda
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
