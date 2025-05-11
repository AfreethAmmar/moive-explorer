import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>My Favorites</Typography>
      <Grid container spacing={2}>
        {favorites.length === 0 ? (
          <Typography>No favorites yet.</Typography>
        ) : (
          favorites.map(movie => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Favorites;
