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

//One-Time Password Generator
//const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {

  const [pass, setPass] = useState("");
  const [count, setCount] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  //const [message, setMessage] = useState("");
  const countRef = useRef();

  const buttonHandler = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }

    let digits = [];
    const numbers = "1234567890";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      digits.push(numbers[randomIndex])
    }
    setPass(digits.join(""));
    setCount(5);
    setButtonDisabled(prevDisabled => !prevDisabled);


    countRef.current = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(countRef.current);
          setButtonDisabled(prevDisabled => !prevDisabled)
          //setMessage("OTP expired. Click the button to generate a new OTP.")
          return null;
        }
        return prevCount - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (countRef.current) {
        clearInterval(countRef.current)
      }
    }
  }, [])

  const message = () => {
    if (!pass) return "";
    if (count > 0) {
      return `Expires in: ${count} seconds`;
    }
    return "OTP expired. Click the button to generate a new OTP."
  }


  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{pass.length > 0 ? pass : "Click 'Generate OTP' to get a code"}</h2>
      <p id="otp-timer" aria-live="polite">{message()}
      </p>
      <button id="generate-otp-button" onClick={buttonHandler} disabled={buttonDisabled}>Generate OTP</button>
    </div>
  )
};

//Superhero Application Form
//const { useState } = React;

export const SuperheroForm = () => {

  const powerSourceOptions = [
    'Bitten by a strange creature',
    'Radioactive exposure',
    'Science experiment',
    'Alien heritage',
    'Ancient artifact discovery',
    'Other'
  ];

  const powersOptions = [
    'Super Strength',
    'Super Speed',
    'Flight',
    'Invisibility',
    'Telekinesis',
    'Other'
  ];

  const [heroName, setHeroName] = useState('');
  const [realName, setRealName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [powers, setPowers] = useState([]);

  const handlePowersChange = e => {
    const { value, checked } = e.target;
    setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
  }

  return (
    <div className='form-wrap'>
      <h2>Superhero Application Form</h2>
      <p>Please complete all fields</p>
      <form method='post' action='https://superhero-application-form.freecodecamp.org'>
        <div className='section'>
          <label>
            Hero Name
            <input
              type='text'
              value={heroName}
              onChange={e => setHeroName(e.target.value)}
            />
          </label>
          <label>
            Real Name
            <input
              type='password'
              value={realName}
              onChange={e => setRealName(e.target.value)}
            />
          </label>
        </div>
        <label className='section column'>
          How did you get your powers?
          <select value={powerSource} onChange={e => setPowerSource(e.target.value)}>
            <option value=''>
              Select one
            </option>
            {powerSourceOptions.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
        <label className='section column'>
          List your powers (select all that apply):

          {powersOptions.map(power => (
            <label key={power}>
              <input
                type='checkbox'
                value={power}
                checked={powers.includes(power)}
                onChange={handlePowersChange}
              />
              <span>{power}</span>
            </label>
          ))}
        </label>
        <button
          className='submit-btn'
          type='submit'
          disabled={!heroName || !realName || !powerSource || powers.length == 0}
        >
          Join the League
        </button>
      </form>
    </div>
  )
};