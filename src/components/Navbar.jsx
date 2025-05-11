import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Navbar({ toggleTheme, mode }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#fff", textDecoration: "none" }}
        >
          Movie Explorer
        </Typography>
        <div>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
