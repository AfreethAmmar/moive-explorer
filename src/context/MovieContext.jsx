import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [lastSearch, setLastSearch] = useState(localStorage.getItem("lastSearch") || "");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("lastSearch", lastSearch);
  }, [favorites, lastSearch]);

  return (
    <MovieContext.Provider value={{ movies, setMovies, favorites, setFavorites, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
