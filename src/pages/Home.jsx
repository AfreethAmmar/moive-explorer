import { useContext, useEffect } from "react";
import { Grid, Typography, useTheme, Box } from "@mui/material";
import axios from "axios";
import { MovieContext } from "../context/MovieContext"; // Ensure correct path
import SearchBar from "../components/SearchBar"; // Ensure correct path
import MovieCard from "../components/MovieCard"; // Ensure correct path

const API_KEY = "c2161c2e8bc6560d1403bd754eb7b56e";

export default function Home() {
  const { movies, setMovies } = useContext(MovieContext);
  const theme = useTheme(); // MUI hook to access current theme

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        if (response.data && response.data.results) {
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [setMovies]);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        px: 2,
        py: 3,
      }}
    >
      <SearchBar />
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        {movies.length ? "Search Results" : "Trending Movies"}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ my: 3 }}>
            No movies available
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
