import SignIn from "../Login/Login";
import React, {useEffect} from "react";
import PageContainer from "../../../components/container/PageContainer";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import logo from "./Components/logo.png";

function Inicio() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    <PageContainer
      title="MARKETPLACE UV"
      description="Mercado de la Universidad de Valparaíso"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#043C5C",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "980px",
          padding: isMobile ? 2 : 3,
          flexDirection: "column",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/* Caja de la izquierda */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" color='white'>Bienvenido a MarketPlaceUV</Typography>
              <img src={logo} alt="Logo" />
              
            </Box>
          </Grid>

          {/* Caja de la derecha */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              height: '100%', 
              width:'80%',  
              }}>
            <SignIn />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Inicio;