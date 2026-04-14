//Reusable Navbar
export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <a href='#'>Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="#">Widgets</a>
        </li>
        <li className="nav-item">
          <button aria-expanded="false">Apps</button>
          <ul className="sub-menu" aria-label="Apps">
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

//Reusable Footer
export const Footer = () => {
  return (
    <footer>
      <ul>
        <li className="foot-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="foot-item">
          <a href="#">Services</a>
        </li>
      </ul>
      <ul>
        <li className="foot-item">
          <a href="#">Videos</a>
        </li>
        <li className="foot-item">
          <a href="#">Discord</a>
        </li>
      </ul>
      <ul>
        <li className="foot-item">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="foot-item">
          <a href="#">Terms and Conditions</a>
        </li>
      </ul>
      <p> © 2026 Dashboard Test</p>
    </footer>
  )
}

//reusable Profile Card
export function Card({ name, title, bio }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p className="card-title">{title}</p>
      <p>{bio}</p>
    </div>
  )
}

//Mood Board
export function App() {
  const profiles = [
    {
      id: 1,
      name: "Mark",
      title: "Front-End developer",
      bio: "I like to work with different front-end technologies and play video games."
    },
    {
      id: 2,
      name: "Tiffany",
      title: "Engineering manager",
      bio: "I have worked in tech for 15 years and love to help people grow in this industry."
    },
    {
      id: 3,
      name: "Doug",
      title: "Back-End developer",
      bio: "I ahve been a software developer for over 20 years and I love workign with Go and Rust."
    }
  ];
  return (
    <div className="flex-container">
      {profiles.map((profile) => (
        <Card key={profile.id} name={profile.name} title={profile.title} bio={profile.bio} />
      ))}
    </div>
  );
}

export function MoodBoardItem({ color, image, description }) {
  return (
    <div className="mood-board-item" style={{ backgroundColor: color }}>
      <img src={image} className="mood-board-image" />
      <h3 className="mood-board-text">{description}</h3>
    </div>
  );
}

export function MoodBoard() {
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        <MoodBoardItem color="blue" image="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg" description="Shore" />
        <MoodBoardItem color="orange" image="https://cdn.freecodecamp.org/curriculum/labs/ship.jpg" description="Ship" />
        <MoodBoardItem color="black" image="https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg"
          description="Santorini" />
      </div>
    </div>
  );
}

// Toggle Text App
const { useState } = React;

export const ToggleApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div id="toggle-container">
      <button onClick={handleToggleVisibility} id="toggle-button">{isVisible ? "Hide " : "Show "}Message</button>
      {isVisible && <p id="message">I love freeCodeCamp!</p>}
    </div>
  );
};



// Color Picker App
//const { useState } = React;

export const ColorPicker = () => {
  const [isColor, setColor] = useState("#ffffff");

  const handleColor = (e) => {
    setColor(e.target.value);
  }

  return (
    <div id='color-picker-container' style={{ backgroundColor: isColor }}>
      <p>Pick Your Color!</p>
      <input type="color" id="color-input" onChange={handleColor} value={isColor} />
    </div>
  )
};

//Fruit Search App
//const { useState, useEffect } = React;

export function FruitsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`https://fruit-search.freecodecamp.rocks/api/fruits?q=${query}`);
        const data = await response.json();
        setResults(data.map(fruit => fruit.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 700);
    return () => clearTimeout(timeoutId);

  }, [query]);

  return (
    <div id="search-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input">Search for fruits:</label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div id="results">
        {results.length > 0 ? (
          results.map(item => (
            <p key={item} className="result-item">{item}</p>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}