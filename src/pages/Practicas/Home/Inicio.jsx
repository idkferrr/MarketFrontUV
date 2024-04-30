import SignIn from "../Login/Login";
import React, {useEffect} from "react";
import PageContainer from "../../../components/container/PageContainer";
import { Box, Typography, Grid} from "@mui/material";
import logo from "./Components/logo.png";
import "./Components/Iniciofont.css"

function Inicio() {
 
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
          height: "100%",
          backgroundColor: "#043C5C",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          height={"100%"}
          width={"100%"}
        >
          {/* Caja de la izquierda */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100%'}}>
            <Typography variant="h3" color='white' className="poiret-one">Bienvenido a <br/> MarketPlace UV</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100%' }}>
              <img src={logo} alt="Logo" style={{width:'650px'}} />
            
            </Box>
          </Grid>

          {/* Caja de la derecha */}
          <Grid item xs={12} md={6}>
            <Box>
            <SignIn />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Inicio;