import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// MUI Components and Theme Provider
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  Chip,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Rating,
  Skeleton,
  Stack,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = "c2161c2e8bc6560d1403bd754eb7b56e";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const BACKDROP_SIZE = "w1280";
  const POSTER_SIZE = "w500";

  // Create theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5'
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        // Movie details
        const detailsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(detailsRes.data);

        // Cast & Crew
        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        setCast(creditsRes.data.cast.slice(0, 6)); // Top 6 actors

        // Trailer
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailer = videoRes.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } catch (err) {
        console.error("Failed to fetch movie data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  // Loading skeletons
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box py={4}>
            <Skeleton variant="rectangular" width="100%" height={400} />
            <Box mt={3}>
              <Skeleton variant="text" height={60} width="70%" />
              <Stack direction="row" spacing={2} mt={2}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
              </Stack>
              <Skeleton variant="text" height={120} mt={2} />
              <Skeleton variant="rectangular" height={200} mt={3} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
    : "/api/placeholder/1280/720";
    
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : "/api/placeholder/500/750";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* Backdrop Header */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 300, md: 500 },
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%), url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mb: 4
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} sx={{ height: "100%", alignItems: "flex-end", pb: 4 }}>
              <Grid item xs={12} md={3} sx={{ mb: { xs: -12, md: -6 } }}>
                <Card elevation={6}>
                  <CardMedia
                    component="img"
                    image={posterUrl}
                    alt={movie.title}
                    sx={{ height: { xs: 240, md: 360 } }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box>
                  <Typography variant="h3" component="h1" fontWeight="bold" color="white">
                    {movie.title} 
                    {movie.release_date && (
                      <Typography component="span" variant="h5" color="white" sx={{ ml: 1, opacity: 0.8 }}>
                        ({new Date(movie.release_date).getFullYear()})
                      </Typography>
                    )}
                  </Typography>
                  {movie.tagline && (
                    <Typography variant="subtitle1" color="white" sx={{ mt: 1, opacity: 0.8, fontStyle: "italic" }}>
                      {movie.tagline}
                    </Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                    {movie.genres?.map(genre => (
                      <Chip 
                        key={genre.id} 
                        label={genre.name} 
                        variant="outlined" 
                        size="small"
                        sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
                      />
                    ))}
                  </Box>
                  {movie.vote_average > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Rating
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        sx={{ color: "primary.light" }}
                      />
                      <Typography variant="body2" color="white" sx={{ ml: 1 }}>
                        {(movie.vote_average / 2).toFixed(1)}/5 ({movie.vote_count} votes)
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Left Column - Movie Info */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Overview
                </Typography> 
                <Typography variant="body1" paragraph>
                  {movie.overview || "No overview available."}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ color: "primary.main", mr: 1, display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7v-5z"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">
                        <strong>Release Date:</strong> {movie.release_date || "Unknown"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ color: "primary.main", mr: 1, display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">
                        <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : "Unknown"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ color: "primary.main", mr: 1, display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">
                        <strong>Budget:</strong> {formatCurrency(movie.budget)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box sx={{ color: "primary.main", mr: 1, display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">
                        <strong>Revenue:</strong> {formatCurrency(movie.revenue)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Cast Section */}
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  Top Cast
                </Typography>
                <Grid container spacing={2}>
                  {cast.length > 0 ? (
                    cast.map(actor => (
                      <Grid item xs={6} sm={4} key={actor.cast_id}>
                        <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            <Avatar 
                              src={actor.profile_path ? `${IMAGE_BASE_URL}w185${actor.profile_path}` : "/api/placeholder/185/185"} 
                              alt={actor.name}
                              sx={{ width: 80, height: 80, mb: 1 }}
                            />
                            <Typography variant="subtitle1" fontWeight="medium" noWrap>
                              {actor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {actor.character}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1">No cast information available.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>

              {/* Trailer Section */}
              {trailerUrl && (
                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box sx={{ color: "primary.main", mr: 1, display: "flex" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7L8 5z"/>
                      </svg>
                    </Box>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                      Trailer
                    </Typography>
                  </Box>
                  <Box sx={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
                    <iframe
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "4px"
                      }}
                      src={trailerUrl}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                </Paper>
              )}
            </Grid>

            {/* Right Column - Additional Info */}
            <Grid item xs={12} md={4}>
              {/* Production Companies */}
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Production
                </Typography>
                <List dense>
                  {movie.production_companies?.length > 0 ? (
                    movie.production_companies.map(company => (
                      <ListItem key={company.id}>
                        <ListItemAvatar>
                          <Avatar alt={company.name} src={company.logo_path ? `${IMAGE_BASE_URL}w92${company.logo_path}` : ""}>
                            {company.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={company.name} secondary={company.origin_country} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2">No production companies information available.</Typography>
                  )}
                </List>
              </Paper>

              {/* Additional Details */}
              <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Additional Details
                </Typography>
                <List dense>
                  {movie.status && (
                    <ListItem>
                      <ListItemText primary="Status" secondary={movie.status} />
                    </ListItem>
                  )}
                  {movie.original_language && (
                    <ListItem>
                      <ListItemText primary="Original Language" secondary={movie.original_language.toUpperCase()} />
                    </ListItem>
                  )}
                  {movie.popularity && (
                    <ListItem>
                      <ListItemText primary="Popularity" secondary={movie.popularity.toFixed(1)} />
                    </ListItem>
                  )}
                  {movie.homepage && (
                    <ListItem>
                      <ListItemText 
                        primary="Homepage" 
                        secondary={
                          <Button 
                            href={movie.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            size="small"
                            variant="outlined"
                          >
                            Visit Website
                          </Button>
                        } 
                      />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MovieDetails;