import { Box, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard"; // Ensure correct path

export default function FavoritePage() {
  const { favorites } = useContext(MovieContext);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 3 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        My Favorite Movies
      </Typography>

      {favorites.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" sx={{ my: 3 }}>
          You have no favorite movies yet.
        </Typography>
      )}
    </Box>
  );
}
