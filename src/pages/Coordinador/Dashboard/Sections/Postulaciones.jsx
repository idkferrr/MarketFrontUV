import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Sidebar from "../../../../components/Navbar/Navbar";
import Tablapostulaciones from "./Tables/Tablapostulaciones";
import Tablaevaluaciones from "./Tables/Tablaevaluaciones";
function Postulaciones() {
  const [activeTable, setActiveTable] = useState(null);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (activeTable) {
      setShowTransition(true);
    }
  }, [activeTable]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: 400 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ padding: 2 }}>
                    Postulaciones
                  </Typography>
                  <Typography variant="body2" sx={{ padding: 2 }}>
                    En esta sección se visualizarán todas las postulaciones que
                    están en proceso
                  </Typography>
                  <Button
                    size="small1"
                    color="primary"
                    variant="containded"
                    onClick={() => setActiveTable("postulaciones")}
                  >
                    Visualizar Postulaciones
                  </Button>
                </CardContent>
              </Box>
            </Card>

            <Card sx={{ minWidth: 275, maxWidth: 400 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ padding: 2 }}>
                    Evaluaciones
                  </Typography>
                  <Typography variant="body2" sx={{ padding: 2 }}>
                    En esta sección se visualizarán todas las postulaciones
                    fueron aceptadas.
                  </Typography>
                  <Button
                    size="small1"
                    color="primary"
                    variant="containded"
                    onClick={() => setActiveTable("evaluaciones")}
                  >
                    Visualizar evaluaciones
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </Box>
          <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            opacity: showTransition ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {activeTable === "postulaciones" && <Tablapostulaciones />}
          {activeTable === "evaluaciones" && <Tablaevaluaciones />}
        </Box>
      </Box>
        </Box>
      </Box>
    </>
  );
}

export default Postulaciones;
