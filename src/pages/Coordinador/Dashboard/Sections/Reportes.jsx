import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Sidebar from "../../../../components/Navbar/Navbar";
function Reportes() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1> Reportes </h1>
          <Typography paragraph>
            Aquí luego irán los reportes de Valparaíso y Santiago{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Reportes;
