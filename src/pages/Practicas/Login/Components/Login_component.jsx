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
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: "600px",
          height: "600px",
        }}
      >
        <form sx={{height:'100%', with:'100%', flexDirection: "column", border:'none', outline:'none'}}>
          <Typography variant="h4" align='center' color='white'>Iniciar Sesión</Typography>
          <label>Correo Electronico</label>
          <input type="text" name="usuario" />
          <label>Contraseña</label>
          <input type="password" name="contraseña" />

        </form>
        <Button onClick={handleLogin}> Iniciar </Button>
      </Box>
    </ThemeProvider>
  );
}
