import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Sidebar from "../../../../components/Navbar/Navbar";
function Dashboard() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1> Inicio </h1>
          <Typography paragraph>
            Bienvenido al nuevo sistema de prácticas de la Administración
            Pública
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
