import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [lastSearch, setLastSearch] = useState(localStorage.getItem("lastSearch") || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("lastSearch", lastSearch);
  }, [favorites, lastSearch]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, favorites, setFavorites, lastSearch, setLastSearch, toggleFavorite, isLoading, setIsLoading }}>
      {children}
    </MovieContext.Provider>
  );
};
