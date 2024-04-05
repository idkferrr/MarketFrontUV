import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Sidebar from "../../../../components/Navbar/Navbar";
function Settings() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1> Ajustes y estadísticas </h1>
          <Typography paragraph>Panel de control y estadísticas </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Settings;
