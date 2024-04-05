import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Sidebar from "../../../../components/Navbar/Navbar"; // This import path may vary
import Tablagenericas from "./Tables/Tablagenericas"; // This import path may vary
import Tablaperso from "./Tables/Tablaperso"; // This import path may vary

function Cartas() {
  const [activeTable, setActiveTable] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const region = 'Valparaíso'; // This can be dynamic based on user input or selection

  const handleGenericButtonClick = () => {
    setActiveTable('genericas');
    setShowTransition(true);
  };

  const handlePersonalizedButtonClick = () => {
    setActiveTable('personalizadas');
    setShowTransition(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Card for Generic Letters */}
          <Card sx={{ minWidth: 275, maxWidth: 500 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ padding: 2 }}>
                  Cartas Genéricas
                </Typography>
                <Typography variant="body2" sx={{ padding: 2 }}>
                  En esta sección se verán todas las cartas de presentación genéricas que se han solicitado los alumnos.
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleGenericButtonClick}
                >
                  Visualizar Cartas Genéricas
                </Button>
              </CardContent>
            </Box>
          </Card>

          {/* Card for Personalized Letters */}
          <Card sx={{ minWidth: 275, maxWidth: 500 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h4" sx={{ padding: 2 }}>
                  Cartas Personalizadas
                </Typography>
                <Typography variant="body2" sx={{ padding: 2 }}>
                  En esta sección se verán todas las cartas de presentación personalizadas que se han solicitado los alumnos.
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handlePersonalizedButtonClick}
                >
                  Visualizar Cartas Personalizadas
                </Button>
              </CardContent>
            </Box>
          </Card>
        </Box>
        
        {/* Table Display Area */}
        <Box sx={{ padding: 1 }}>
          <Box
            sx={{
              opacity: showTransition ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            {activeTable === "genericas" && <Tablagenericas region={region} />}
            {activeTable === "personalizadas" && <Tablaperso region={region} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Cartas;
