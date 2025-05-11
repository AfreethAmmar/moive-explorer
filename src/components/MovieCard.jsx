import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 200, cursor: "pointer" }} onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">{movie.release_date?.split("-")[0]}</Typography>
        <Typography variant="body2">Rating: {movie.vote_average}</Typography>
      </CardContent>
    </Card>
  );
}
