import {
  Container,
  Typography,
  Box,
  Link,
  Button,
  Toolbar,
} from "@mui/material";

function Footer() {
  const footerLinks = [
    { name: "Sobre Nosotros", path: "/sobre-nosotros" },
    { name: "Contacto", path: "/contacto" },
    { name: "Ayuda", path: "/ayuda" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#043C5C",
        color: "white",
        mt: 0,
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ bgcolor: "#043C5C" }}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {footerLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{ color: "white", my: 2, mr: 6, display: "block" }}
              >
                {link.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <Typography variant="body2" align="center" mt={1}>
          © 2023 Escuela de Administración Pública
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
