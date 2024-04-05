import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

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
import { parse } from "@fortawesome/fontawesome-svg-core";
//Todo function to validate token

const defaultTheme = createTheme();

//TODO USSEFFECTS PARA LAS COSITAS

export default function Options() {
  const [ct_cg, setCg] = useState(null);
  const [ct_cp, setCp] = useState(null);
  const [data, setData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState({
    primerNombre: "",
    segundoNombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    run: "",
    correoInstitucional: "",
    df: "",
    sexo: "",
    sede: "",
    anioIngreso: "",
    correoPersonal: "",
    telefono: "",
    ultimoSemAprobado: ""
  });
  /*
    run: 21061253,
    df: 'k',
    contrasena: null,
    primerNombre: 'Maximiliano',
    segundoNombre: 'Alejandro',
    apellidoPaterno: 'Aguirre',
    apellidoMaterno: 'Faúndes',
    correoPersonal: null,
    correoInstitucional: 'maximiliano.aguirre@alumnos.uv.cl',
    telefono: '946198077',
    ultimoSemAprobado: 'Octavo semestre',
    sede: 'Valparaíso',
    anioIngreso: 2023,
    sexo: 'masculino'
  */

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%", // Increase the width here
    maxWidth: "800px", // Set a max-width to ensure it doesn't grow too wide
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const email = jwtDecode(Cookies.get("token")).email;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleButtonClick = (actionName) => {
    console.log(`Action ${actionName} triggered`);
  };
  
  const updateInformation = async () => {
    try {
      inputs.run = parseInt(inputs.run);
      const response = await axios.patch(
        "http://localhost:3000/api/alumno",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // Handle response or further actions
    } catch (error) {
      console.error("Error updating information:", error);
      // Handle error
    }
    //Realizar método patch para actualizar persona, dejar en claro que si falta uno de los inputs, la wea no se debe actualizar
    return;
  };

  const handleSubmit = async (e) => {
    updateInformation();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/alumno/rev/${email}`
        );
        const data = response.data;
        setInputs({
          primerNombre: data.primerNombre || "",
          segundoNombre: data.segundoNombre || "",
          apellidoPaterno: data.apellidoPaterno || "",
          apellidoMaterno: data.apellidoMaterno || "",
          run: parseInt(data.run) || "",
          correoInstitucional: data.correoInstitucional || "",
          df: data.df || "",
          sexo: data.sexo || "",
          sede: data.sede || "",
          anioIngreso: data.anioIngreso || "", // Assuming anioIngreso is a number
          correoPersonal: data.correoPersonal || "",
          telefono: data.telefono || "",
          ultimoSemAprobado: data.ultimoSemAprobado || "",
        });
        // Assuming all fields are necessary and directly mapping fetchedData fields to form state
        if (
          data.run === null ||
          data.df === null ||
          data.primerNombre === null ||
          data.segundoNombre === null ||
          data.apellidoPaterno === null ||
          data.apellidoMaterno === null ||
          data.correoInstitucional === null ||
          data.telefono === null ||
          data.sede === null ||
          data.anioIngreso === null ||
          data.sexo === null ||
          data.telefono === null ||
          data.ultimoSemAprobado === null
        ) {
          setIsButtonDisabled(true);
          handleOpen(); // Open the modal if any field is null
        } else {
          setIsButtonDisabled(false);
          handleClose(); // Close the modal if all fields are filled
        }
        // Update form state with fetched data
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsButtonDisabled(true); // Consider disabling the button and showing the modal on error as well
        handleOpen();
      }
    };

    fetchData();
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/alumno/ct-gen/${email}`
        );
        if (response.data == 0) {
          setCg("0");
        } else {
          setCg(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/alumno/ct-per/${email}`
        );
        if (response.data == 0) {
          setCp("0");
        } else {
          setCp(response.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const tiers = [
    {
      title: "Carta Genérica",
      subheader: `Solicitado ${ct_cg} veces`,

      description: [
        "Se generará automáticamente su Carta genérica. Considere que ésta reemplazará a la más reciente que haya solicitado, creando nuevamente la solicitud.",
      ],
      buttonText: "Generar",
      buttonVariant: "contained",
    },
    {
      title: "Carta Personalizada",
      subheader: `Solicitado ${ct_cp} veces`,

      description: [
        "Deberá rellenar el formulario para poder genererar la solicitud de Carta Personalizada. Considere que ésta reemplazará a la más reciente que haya solicitado, creando nuevamente la solicitud.",
      ],
      buttonText: "Generar",
      buttonVariant: "contained",
    },
    {
      title: "Postulación Primera Práctica",
      subheader: "Solicitado # veces",
      price: "Ver postulaciones",
      description: [
        "Formulario de postulación para su primera práctica profesional.",
      ],
      buttonText: "Generar",
      buttonVariant: "contained",
    },
    {
      title: "Postulación Segunda Práctica",
      subheader: "Solicitado # veces",
      price: "Ver postulaciones",
      description: [
        "Formulario de postulación para su segunda práctica profesional.",
      ],
      buttonText: "Generar",
      buttonVariant: "contained",
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      {/*
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>alo te faltan cosa</div>
        </Modal>
  */}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, overflow: "auto", maxHeight: "90vh" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificación data personal
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
              id="primerNombre"
              label="Ingrese su primer nombre"
              name="primerNombre"
              autoComplete="primer_nombre"
              autoFocus
              value={inputs.primerNombre}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ingrese su segundo nombre"
              type="text"
              name="segundoNombre"
              id="segundoNombre"
              value={inputs.segundoNombre}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apellidoPaterno"
              label="Ingrese su primer apellido"
              type="apellidoPaterno"
              id="apellidoPaterno"
              value={inputs.apellidoPaterno}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apellidoMaterno"
              label="Ingrese su segundo apellido"
              type="text"
              id="apellidoMaterno"
              value={inputs.apellidoMaterno}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="run"
              label="Ingrese su rut sin puntos ni guión"
              type="number"
              id="run"
              value={inputs.run}
              onChange={handleChange}
              inputProps={{ pattern: "[0-9]*" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="correoInstitucional"
              label="Ingrese su correo institucional"
              type="text"
              id="correoInstitucional"
              value={inputs.correoInstitucional}
              onChange={handleChange}
            />

            <Box>
              <Grid container spacing={3}>
                {" "}
                {/* Wrapper Grid container */}
                <Grid item xs={6}>
                  {" "}
                  {/* First Grid item */}
                  <FormLabel id="sexo">Género</FormLabel>
                  <RadioGroup
                    defaultValue="femenino"
                    name="sexo"
                    onChange={handleChange}
                    value={inputs.sexo}
                  >
                    <FormControlLabel
                      value="femenino"
                      control={<Radio />}
                      label="Mujer"
                    />
                    <FormControlLabel
                      value="masculino"
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
                  <InputLabel id="sede">Sede</InputLabel>
                  <Select
                    labelId="sede"
                    id="sede"
                    label="sede"
                    name="sede"
                    value={inputs.sede}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Valparaíso"}>Valparaíso</MenuItem>
                    <MenuItem value={"Santiago"}>Santiago</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  {/* Second Grid item */}
                  <InputLabel id="agno">Año de Ingreso</InputLabel>
                  <Select
                    labelId="anioIngreso"
                    id="anioIngreso"
                    label="anioIngreso"
                    name="anioIngreso"
                    value={inputs.anioIngreso}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={2008}>2008</MenuItem>
                    <MenuItem value={2009}>2009</MenuItem>
                    <MenuItem value={2010}>2010</MenuItem>
                    <MenuItem value={2011}>2011</MenuItem>
                    <MenuItem value={2012}>2012</MenuItem>
                    <MenuItem value={2013}>2013</MenuItem>
                    <MenuItem value={2014}>2014</MenuItem>
                    <MenuItem value={2015}>2015</MenuItem>
                    <MenuItem value={2016}>2016</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <TextField
              margin="normal"
              fullWidth
              name="correoPersonal"
              label="Correo Personal"
              type="correoPersonal"
              id="correoPersonal"
              value={inputs.correoPersonal}
              onChange={handleChange}
              defaultValue={null}

            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="telefono"
              label="Teléfono"
              type="tel"
              id="telefono"
              value={inputs.telefono}
              onChange={(e) => {
                // Allow changes only if the new value is empty or all digits
                if (e.target.value === "" || /^[0-9]*$/.test(e.target.value)) {
                  setInputs({ ...inputs, [e.target.name]: e.target.value });
                }
              }}
            />

            <InputLabel id="ultimoSemAprobado">
              Último Semestre Aprobado
            </InputLabel>
            <Select
              defaultValue={null}
              labelId="ultimoSemAprobado"
              id="ultimoSemAprobado"
              value={inputs.ultimoSemAprobado}
              label="Último Semestre Aprobado"
              name="ultimoSemAprobado"
              onChange={handleChange}
            >
              <MenuItem value="Primer Semestre">Primer Semestre</MenuItem>
              <MenuItem value="Segundo Semestre">Segundo Semestre</MenuItem>
              <MenuItem value="Tercer Semestre">Tercer Semestre</MenuItem>
              <MenuItem value="Cuarto Semestre">Cuarto Semestre</MenuItem>
              <MenuItem value="Quinto Semestre">Quinto Semestre</MenuItem>
              <MenuItem value="Sexto Semestre">Sexto Semestre</MenuItem>
              <MenuItem value="Séptimo Semestre">Séptimo Semestre</MenuItem>
              <MenuItem value="Octavo Semestre">Octavo Semestre</MenuItem>
              <MenuItem value="Noveno Semestre">Noveno Semestre</MenuItem>
              <MenuItem value="Décimo Semestre">Décimo Semestre</MenuItem>
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modificar Data Personal
            </Button>
          </Box>
        </Box>
      </Modal>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 10, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Postulación a Prácticas Profesionales
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "15vh",
          }}
        >
          <img
            src="https://practicas.administracionpublica-uv.cl/imagenes/logo_sis_practicas.png"
            alt="Logo Practicas Profesionales"
            style={{
              width: "350px",
              height: "100px",
              transform: "scale(0.8)", // Adjust the scale as needed
            }} // Adjust the size as needed
          />
        </Box>
      </Container>
      <Button onClick={handleOpen}>Modificar data perfil</Button>{" "}
      <Container maxWidth={false} component="main">
        <Grid container spacing={2} alignItems="flex">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  //action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h5"
                      color="text.primary"
                    >
                      {tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions sx={{ mb: 2 }}>
                  <Button
                    disabled={isButtonDisabled}
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => handleButtonClick(tier.actionName)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, mb: 5 }}>
          <Typography component="h2" align="center" color="text.primary">
            Podrás elegir entre estas cuatro opciones para llevar a cabo la
            postulación de práctica profesional. Puedes solicitar una carta de
            recomendación para llevarla a tu futuro empleador o rellenar el
            formulario para que el/la coordinador(a) de prácticas te ayude en
            este proceso.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
