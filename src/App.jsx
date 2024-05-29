import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import appFirebase from "./credenciales";

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Este efecto se suscribe al estado de autenticación cuando el componente se monta
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Función de limpieza que se llama cuando el componente se desmonta
    return unsubscribe;
  }, []); // Dependencias vacías aseguran que el efecto se ejecute solo una vez

  return <div>{user ? <Home correoUsuario={user.email} /> : <Login />}</div>;
}

export default App;
