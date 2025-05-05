import { React, useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import AnimeCard from "./components/AnimeCard";

const API_BASE_URL = "https://api.jikan.moe/v4";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchAnime = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/top/anime?&type=tv&filter=bypopularity&limit=5`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data = await response.json();

      if (data.response === false) {
        setErrorMessage(data.Error || "Failed to fetch anime");
        setAnimeList([]);
        return;
      }

      setAnimeList(data.data || []);
    } catch (error) {
      console.error(`Error  fetching anime: ${error}`);
      setErrorMessage("Error fetching anime, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img className="logo" src="./vite.svg" alt="placeholder image" />
          <h1>
            Find <span className="text-gradient">Anime</span> You Like
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="trending">
          <h2>Trending Anime</h2>
          <ul>
            {animeList.map((anime, index) => (
              <li key={anime.mal_id}>
                <p>{index + 1}</p>
                <img src={anime.images.jpg.large_image_url} anime={anime} />
              </li>
            ))}
          </ul>
        </section>
        <section className="all-anime">
          <h2 className="mt-[40px]">All Anime</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
