import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";  
import Favorites from "./pages/Favorites";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";

function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? { primary: { main: "#1976d2" }, background: { default: "#f4f4f4" } } : { primary: { main: "#90caf9" }, background: { default: "#121212" } }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <Navbar toggleTheme={toggleTheme} mode={mode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
