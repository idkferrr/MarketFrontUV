import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ReplyIcon from "@mui/icons-material/Reply";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FilePresent } from "@mui/icons-material";
import { FormControl, FormLabel } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (Cookies.get("token")) {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        navigate("/practicas/success");
      } catch (error) {
        Cookies.remove("token");
        window.location.href =
          "http://localhost:3000/api/auth/google?prompt=select_account";
      }
    } else {
      Cookies.remove("token");
      window.location.href =
        "http://localhost:3000/api/auth/google?prompt=select_account";
    }
  };
  /*
  const handleLogin = () => {
    if (Cookies.get('token')) {
      verifyUser();
      navigate("/practicas/success");
    }else{
      window.location.href = "http://localhost:3000/api/auth/google?prompt=select_account";    }
  }
  */

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.3)",
          width: "80%",
          height: "100%",
          borderRadius: "20px",
        }}
      >
        <FormControl component="fieldset" sx={{ 
          marginBottom: '1rem', padding: '8rem', fontSize: '0.8rem', borderRadius:'100px', width:'100%', height:'100%',marginTop:'5rem' }}>
          <FormLabel component="legend" 
            sx={{
              fontSize:"1.75rem", textAlign:"center", color:"white",}}>Iniciar Sesión</FormLabel>
          <TextField 
            name='Correo Electronico'
            placeholder="Correo Electronico"
            InputProps={{
              style: { color: 'white' }
            }}
            sx={{ marginBottom: '1rem' }}

            />
          <TextField 
            name='Contraseña'
            type="password"
            placeholder="Contraseña"
            InputProps={{
              style: { color: 'white' }
            }}
            sx={{ marginBottom: '1rem' }}

            />
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography variant="body1" align='center' color='white'>¿Olvidaste tu contraseña?</Typography>
            <Button variant="text" sx={{color:"#12707F"}}>Recuperar</Button>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography variant="body1" align='center' color='white'>¿No tienes cuenta?</Typography>
            <Button variant="text" sx={{color:"#12707F"}}>Crear Cuenta</Button>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center',}}>
            <Button variant="contained" onClick={handleLogin} 
                sx={{
                  backgroundColor: '#12707F',  
                  padding: '1.5rem', 
                  fontSize: '0.8rem', 
                  borderRadius:'25px', 
                  width:'65%',
                  '&:hover': {
                    backgroundColor: '#12707F',
                  } }}> Iniciar </Button>
            </Box>
        
        </FormControl>
        
      </Box>
    </ThemeProvider>
  );
}
