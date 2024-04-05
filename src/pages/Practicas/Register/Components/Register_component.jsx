import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import BackgroundLocal from "./Images/valpoback.jpg";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const closeFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  const [inputs, setInputs] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    rut: "",
    correo_u: "",
    df: "",
    genero: "",
    Sede: "",
    agno: "",
    correo_personal: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/", inputs);
      if (res.status === 200) {
        setIsSuccessModalOpen(true);
      }
    } catch (err) {
      setIsFailureModalOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundLocal})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Dialog open={isSuccessModalOpen} onClose={closeSuccessModal}>
              <DialogContent>
                <Typography variant="h6">¡Usuario registrado!</Typography>
                <Typography variant="body1">
                  Has registrado correctamente a {inputs.nombre_completo}.
                </Typography>
              </DialogContent>
            </Dialog>
            <Dialog open={isFailureModalOpen} onClose={closeFailureModal}>
              <DialogContent>
                <Typography variant="h6">Usuario no registrado</Typography>
                <Typography variant="body1">
                  El usuario {inputs.nombre_completo} ya está registrado, o
                  ocurrió un error.
                </Typography>
              </DialogContent>
            </Dialog>

            <Typography component="h1" variant="h4" sx={{mb: "10px"}}>
              Datos del Alumno
            </Typography>
            <Typography component="h2" variant="h5">
              Ingrese sus datos con prudencia, luego estos serán usados para la generación de sus documentos. 
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="primer_nombre"
                label="Ingrese su primer nombre"
                name="primer_nombre"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="segundo_nombre"
                label="Ingrese su segundo nombre"
                type="text"
                id="segundo_nombre"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="primer_apellido"
                label="Ingrese su primer apellido"
                type="primer_apellido"
                id="primer_apellido"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="segundo_apellido"
                label="Ingrese su segundo apellido"
                type="text"
                id="segundo_apellido"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="rut"
                label="Ingrese su rut sin puntos ni guión"
                type="text"
                id="rut"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="correo_u"
                label="Ingrese su correo institucional"
                type="text"
                id="correo_u"
                onChange={handleChange}
              />

              <Box>
                <Grid container spacing={3}>
                  {" "}
                  {/* Wrapper Grid container */}
                  <Grid item xs={6}>
                    {" "}
                    {/* First Grid item */}
                    <FormLabel id="genero">Gender</FormLabel>
                    <RadioGroup defaultValue="Mujer" name="genero">
                      <FormControlLabel
                        value="Mujer"
                        control={<Radio />}
                        label="Mujer"
                      />
                      <FormControlLabel
                        value="Hombre"
                        control={<Radio />}
                        label="Hombre"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    {/* First Grid item */}
                    <InputLabel id="df">Dígito Verificador</InputLabel>
                    <Select
                      labelId="df"
                      id="df"
                      label="df"
                      name="df"
                      value={inputs.df}
                      onChange={handleChange}
                    >
                      <MenuItem value={"0"}>0</MenuItem>
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5</MenuItem>
                      <MenuItem value={"6"}>6</MenuItem>
                      <MenuItem value={"7"}>7</MenuItem>
                      <MenuItem value={"8"}>8</MenuItem>
                      <MenuItem value={"9"}>9</MenuItem>
                      <MenuItem value={"k"}>k</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    {/* Second Grid item */}
                    <InputLabel id="Sede">Sede</InputLabel>
                    <Select
                      labelId="Sede"
                      id="Sede"
                      label="Sede"
                      name="Sede"
                      value={inputs.Sede}
                      onChange={handleChange}
                    >
                      <MenuItem value={"V"}>Valparaíso</MenuItem>
                      <MenuItem value={"S"}>Santiago</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    {/* Second Grid item */}
                    <InputLabel id="agno">Año de Ingreso</InputLabel>
                    <Select
                      labelId="agno"
                      id="agno"
                      label="agno"
                      name="agno"
                      value={inputs.categoria}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"2008"}>2008</MenuItem>
                      <MenuItem value={"2009"}>2009</MenuItem>
                      <MenuItem value={"2010"}>2010</MenuItem>
                      <MenuItem value={"2011"}>2011</MenuItem>
                      <MenuItem value={"2012"}>2012</MenuItem>
                      <MenuItem value={"2013"}>2013</MenuItem>
                      <MenuItem value={"2014"}>2014</MenuItem>
                      <MenuItem value={"2015"}>2015</MenuItem>
                      <MenuItem value={"2016"}>2016</MenuItem>
                      <MenuItem value={"2017"}>2017</MenuItem>
                      <MenuItem value={"2018"}>2018</MenuItem>
                      <MenuItem value={"2019"}>2019</MenuItem>
                      <MenuItem value={"2020"}>2020</MenuItem>
                      <MenuItem value={"2021"}>2021</MenuItem>
                      <MenuItem value={"2022"}>2022</MenuItem>
                      <MenuItem value={"2023"}>2023</MenuItem>
                      <MenuItem value={"2024"}>2024</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="correo_personal"
                label="Correo personal"
                type="correo_personal"
                id="correo_personal"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
