import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PageContainer from "../../../components/container/PageContainer";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignIn() {

  /*global google*/

  function handleCallbackRespone(response) {
    console.log("token: ", response.credential)
    var UserObject = jwtDecode(response.credential)
    console.log(UserObject)
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "417041141509-495v48nc29snmejlojgaj49pq8ck3ukn.apps.googleusercontent.com",
      callback: handleCallbackRespone
    });
    google.accounts.id.renderButton(
      document.getElementById("signIn"),
      {theme: "outline", size: "large"}
    )

  }, []);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    RUN: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/coord/practicas")
    try {
      const res = await axios.post("/userver/", inputs);
      console.log(res)
      if (res.data.status === true) {
        alert("Bienvenido ");
        
      }else if(res.data.message === "Usuario no existente"){
        alert("Usuario no encontrado")
      }else if(res.data.message === "Contraseña incorrecta"){
        alert("Contraseña incorrecta")
      }
    } catch (error) {
      console.error("Error al hacer la petición:", error.response.data);
      // Aquí puedes establecer algún estado o mostrar un mensaje al usuario
  }
  };

  return (
    <PageContainer
      title="Coordinadores SSP-APU | Administración Pública"
      description="Sistema de prácticas profesionales"
    >
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url('https://i.imgur.com/NdyWLVr.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "500px",
            height: "450px",
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "30px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          
          <Typography component="h1" variant="h5" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}>
            Coordinadore SSP-APU
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="RUN"
              label="Usuario"
              name="RUN"
              autoComplete="RUN"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4 }}
            >
              Ingresar
            </Button>
            <Box
              id="signIn"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
                Ingresar con google
              </Button>
            </Box>
           
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    </PageContainer>
  );
}

/*
<Box
              id="signIn"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Ingresar con google
              </Button>
            </Box>
*/

