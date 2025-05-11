import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext"; // Ensure correct path
import FavoriteIcon from '@mui/icons-material/Favorite'; // Filled heart icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Empty heart icon

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(MovieContext);

  // Check if the movie is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <Card
      sx={{
        maxWidth: 250,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        height="350"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <Box sx={{ position: 'relative' }}>
        <CardContent sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            {movie.release_date?.split("-")[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Rating: {movie.vote_average}
          </Typography>

          {/* Heart Icon for Favorite */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to movie details page
              toggleFavorite(movie); // Toggle favorite status
            }}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              padding: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: 'red' }} /> // Filled heart
            ) : (
              <FavoriteBorderIcon sx={{ color: 'gray' }} /> // Empty heart
            )}
          </IconButton>
        </CardContent>
      </Box>
    </Card>
  );
}
