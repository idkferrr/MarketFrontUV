import React, { lazy } from "react";
import Loadable from "../layouts/Loadable";
import { Navigate } from "react-router-dom";

/* ***Layouts**** */
const FullLayout = Loadable(
  lazy(() => import("../layouts/full-layout/MainLayout"))
);

const SecondLayout = Loadable(
  lazy(() => import("../layouts/full-layout/SecondLayout"))
);

const Navbar = Loadable(lazy(() => import("../components/Navbar/Navbar")));
/* ***End Layouts**** */

const Error = Loadable(lazy(() => import("../pages/Error/404")));

const Login = Loadable(lazy(() => import("../layouts/auth/Login")));

/* ****Pages***** */
//Prácticas
const Register = Loadable(
  lazy(() => import("../pages/Practicas/Register/Register"))
);
const Cartaspost = Loadable(
  lazy(() => import("../pages/Practicas/Gen/CartasyPost"))
);
const Inicio = Loadable(lazy(() => import("../pages/Practicas/Home/Inicio")));
const InicioSesion = Loadable(
  lazy(() => import("../pages/Practicas/Login/Login"))
);
//Coordinador
const Inicocoord = Loadable(
  lazy(() => import("../pages/Coordinador/Login/Login"))
);
const Dashboard = Loadable(
  lazy(() => import("../pages/Coordinador/Dashboard/Sections/Dashboard"))
);
const Postulaciones = Loadable(
  lazy(() => import("../pages/Coordinador/Dashboard/Sections/Postulaciones"))
);
const Cartas = Loadable(
  lazy(() => import("../pages/Coordinador/Dashboard/Sections/Cartas"))
);
const Settings = Loadable(
  lazy(() => import("../pages/Coordinador/Dashboard/Sections/Settings"))
);
const Reportes = Loadable(
  lazy(() => import("../pages/Coordinador/Dashboard/Sections/Reportes"))
);
/* ****Routes***** */

//Páginas trabajadas:
//Cartas y postulaciones (Cartaspost)
//Inico
//Inicio Sesión 1/2 (InicioSesion)
//Registro

const Router = [
  {
    //Rutas públicas
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "", exact: true, element: <Inicio /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <Error /> },
    ],
  },
  {
    path: "/practicas",
    element: <Login />,
    children: [
      {path: "success", element: <Cartaspost />},
      //Aquí tendrá que ir a una pantalla "Unauthorized" { path: "*", element:  <> },
    ],
  },
  {
    path: "/coord", //Second layout-> Full Layout pero sin footer
    element: null,
    children: [
      { path: "", exact: true, element: <Inicocoord /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "iniciar_sesion", exact: true, element: <InicioSesion /> },
    ],
  },
  {
    path: "/coord/practicas", //Second layout-> Full Layout pero sin footer
    element: null,
    children: [
      { path: "", exact: true, element: <Dashboard /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "postulaciones", exact: true, element: <Postulaciones /> },
      { path: "cartas", exact: true, element: <Cartas /> },
      { path: "settings", exact: true, element: <Settings /> },
      { path: "reportes", exact: true, element: <Reportes /> },
    ],
  },
];
// <NavBar />
export default Router;
