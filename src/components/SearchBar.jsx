import { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";

const API_KEY = "c2161c2e8bc6560d1403bd754eb7b56e";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { setMovies, setLastSearch } = useContext(MovieContext);

  const searchMovies = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
        },
      });
      setMovies(res.data.results);
      setLastSearch(query);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <TextField value={query} onChange={(e) => setQuery(e.target.value)} label="Search Movies" />
      <Button variant="contained" onClick={searchMovies} style={{ marginLeft: "10px" }}>
        Search
      </Button>
    </div>
  );
}
