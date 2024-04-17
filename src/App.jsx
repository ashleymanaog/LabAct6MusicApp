import React, { useState } from "react";
import "./App.css";

const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "Bini",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Alam mo ba girl",
    artist: "Hev Abi",
    genre: "Hiphop",
  },
  {
    id: 3,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
  },
  {
    id: 4,
    title: "Spring Day",
    artist: "BTS",
    genre: "K-Pop",
  },
  {
    id: 5,
    title: "Honeymoon Avenue",
    artist: "Ariana Grande",
    genre: "Pop",
  },
  {
    id: 6,
    title: "Get Him Back",
    artist: "Olivia Rodrigo",
    genre: "Pop",
  },
  {
    id: 7,
    title: "Mundo",
    artist: "IV of Spades",
    genre: "Pop",
  },
  {
    id: 8,
    title: "Sa Susunod na Habang Buhay",
    artist: "Ben&Ben",
    genre: "Indie",
  },
  {
    id: 9,
    title: "Titibo-Tibo",
    artist: "Moira Dela Torre",
    genre: "Pop",
  },
  {
    id: 10,
    title: "Maybe the Night",
    artist: "Ben&Ben",
    genre: "Indie",
  },
  {
    id: 11,
    title: "Bawat Daan",
    artist: "Ebe Dancel",
    genre: "Pop",
  },
  {
    id: 12,
    title: "Huling Sandali",
    artist: "December Avenue",
    genre: "Alternative",
  },
  {
    id: 13,
    title: "Hanggang Kailan",
    artist: "Orange & Lemons",
    genre: "Pop",
  },
  {
    id: 14,
    title: "Kung 'Di Rin Lang Ikaw",
    artist: "December Avenue feat. Moira Dela Torre",
    genre: "Alternative",
  },
  {
    id: 15,
    title: "Dati",
    artist: "Sam Concepcion, Tippy Dos Santos, and Quest",
    genre: "Pop",
  },
  {
    id: 16,
    title: "Tadhana",
    artist: "Up Dharma Down",
    genre: "Indie",
  },
  {
    id: 17,
    title: "Sana Maulit Muli",
    artist: "Gary Valenciano",
    genre: "Pop",
  },
  {
    id: 18,
    title: "Kung Ayaw Mo, 'Wag Mo",
    artist: "Rivermaya",
    genre: "Rock",
  },
  {
    id: 19,
    title: "Sundo",
    artist: "Imago",
    genre: "Alternative",
  },
  {
    id: 20,
    title: "Your Universe",
    artist: "Rico Blanco",
    genre: "Rock",
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "Neneng B",
    artist: "Nik Makino",
    genre: "Rap",
    userRating: 5,
  },
];

function App() {
  const [musics, setMusics] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [query, setQuery] = useState("");
  const [ratings, setRatings] = useState({}); // State for storing ratings

  const addToPlaylist = (music) => {
    if (!playlist.find((item) => item.id === music.id)) {
      setPlaylist([...playlist, music]);
    }
  };

  const handleRatingChange = (id, rating) => {
    setRatings({ ...ratings, [id]: rating }); // Update ratings state
  };

  const isSongInPlaylist = (musicId) => {
    return playlist.some((music) => music.id === musicId);
  };

  const filteredMusics = musics.filter(
    (music) =>
      music.title.toLowerCase().includes(query.toLowerCase()) ||
      music.artist.toLowerCase().includes(query.toLowerCase()),
  );

  const totalSongsInPlaylist = playlist.length;

  return (
    <div>
      <NavBar onSearch={setQuery} />
      <div className="controls">
        <SortButton
          sortSongs={() =>
            setMusics(
              [...musics].sort((a, b) => a.title.localeCompare(b.title)),
            )
          }
        />
        <FilterDropdown
          options={Array.from(new Set(musics.map((music) => music.genre)))}
          filterSongs={(genre) => {
            if (genre === "") {
              setMusics(tempMusicData);
            } else {
              setMusics(tempMusicData.filter((music) => music.genre === genre));
            }
          }}
        />
      </div>
      <Main>
        <Box title="Music List">
          <MusicList
            musics={filteredMusics}
            addToPlaylist={addToPlaylist}
            ratings={ratings}
            handleRatingChange={handleRatingChange}
            isSongInPlaylist={isSongInPlaylist}
          />
        </Box>
        <Box title={`Playlist (${totalSongsInPlaylist} songs)`}>
          <PlayList playlist={playlist} ratings={ratings} />
          <Summary totalSongs={totalSongsInPlaylist} />
        </Box>
      </Main>
    </div>
  );
}

function NavBar({ onSearch }) {
  return (
    <div className="navbar">
      <Logo />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo">Music App</h1>;
}

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search songs..."
        onChange={handleSearch}
      />
    </div>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

function Box({ children, title }) {
  return (
    <div className="box">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function MusicList({
  musics,
  addToPlaylist,
  ratings,
  handleRatingChange,
  isSongInPlaylist,
}) {
  return (
    <ul>
      {musics.map((music) => (
        <li key={music.id}>
          <div className="music-info">
            <div>
              <span>{music.title}</span> by <span>{music.artist}</span> (
              {music.genre})
            </div>
          </div>
          <button
            className="addToPlaylist"
            onClick={() => addToPlaylist(music)}
            disabled={isSongInPlaylist(music.id)}
          >
            {isSongInPlaylist(music.id) ? "💜" : "💟"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PlayList({ playlist }) {
  const generateRandomRating = () => {
    return Math.floor(Math.random() * 3) + 3; // Random rating between 3 and 5
  };

  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <div className="user-rating">
            <span>⭐</span>
            <span>{generateRandomRating()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Summary({ totalSongs }) {
  return (
    <div className="summary">
      <p>Total Songs in Playlist: {totalSongs}</p>
    </div>
  );
}

function SortButton({ sortSongs }) {
  return <button onClick={sortSongs}>Sort A-Z</button>;
}

function FilterDropdown({ options, filterSongs }) {
  return (
    <select className="dropdown" onChange={(e) => filterSongs(e.target.value)}>
      <option value="" variant="info">
        All Genres
      </option>
      {options.map((genre, index) => (
        <option key={index} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default App;
