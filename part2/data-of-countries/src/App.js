import { useState, useEffect } from "react";

const api_key = process.env.REACT_APP_API_KEY
console.log(api_key);

const getData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
/* -------------------------------------------------------------------------- */
/*                             COUNTRIES API DATA                             */
/* -------------------------------------------------------------------------- */
let countries = []
const setCountries = async () => {
  const data = await getData("https://restcountries.com/v3.1/all");
  countries = data;
}
setCountries();
/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
const Filter = ({title, filterValue, changeFilterValue}) => {
  const _changeFilterValue = (e) => changeFilterValue(e.target.value);
  return (
    <div>
      <p>{title}</p>
      <input 
        type="text" 
        value={filterValue} 
        onChange={_changeFilterValue}
        placeholder="by Name"
        required
      />
    </div>
  );
}

const CountryItem = ({name, onClick}) => (
  <div>
    <span>{name} </span>
    <button type="button" onClick={onClick}>show</button>
  </div>
);

const CountriesList = ({countries, changeFilterValue}) => {
  const _changeFilterValue = (val) => () => changeFilterValue(val);
  return countries.map(country => (
    <CountryItem 
      key={country.name.common} 
      name={country.name.common}
      onClick={_changeFilterValue(country.name.common)}
    />
  ));
}

const CapitalWeather = ({capital}) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getData(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(data => {
      setWeather(() => data);
    })
  },[]);
  console.log("weather", weather);
  if (weather === null) return null;
  return (
    <div>
      <h2>{`Weather in ${capital}`}</h2>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="" 
      />
      <div>
        <strong>Temperature: </strong>
        <span>{`${weather.main.temp} celcius`}</span>
      </div>
      <div>
        <strong>Wind: </strong>
        <span>{`${weather.wind.speed} m/s`}</span>
      </div>
    </div>
  );
}

const CountryData = ({country}) => (
  <section>
    <h2>{country.name.common}</h2>
    <div>
      <strong>Capital: </strong>
      <span>{country.capital ? country.capital[0] : "No info"}</span>
    </div>
    <div>
      <strong>Area: </strong>
      <span>{country.area}</span>
    </div>
    <div>
      <strong>Lenguages: </strong>
      <ul>
        {Object
          .keys(country.languages)
          .map(lang => <li key={lang}>{country.languages[lang]}</li>)
        }
      </ul>
    </div>
    <img
      src={country.flags.png}
      srcSet={country.flags.png}
      alt={`${country.name.common} flag`} 
      decoding="async" 
      loading="lazy"
    />
    <hr/>
    {country.capital &&
    <CapitalWeather capital={country.capital[0]}/>
    }
  </section>
);

const Countries = ({countries, filterValue, changeFilterValue}) => {
  console.log("COUNTRIES",countries)
  if (filterValue !== "") {
    if (countries.length > 10) return <p>{`${countries.length} matches, be more specific`}</p>; 
    if (countries.length > 1) return <CountriesList countries={countries} changeFilterValue={changeFilterValue}/>; 
    if (countries.length > 0) return <CountryData country={countries[0]}/>; 
    return <p>No matches found</p>; 
  }
  return <p>No country search</p>; 
}


const App = () => {
  const [searchCountries, setSearchCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (filterValue === "") {
      setSearchCountries(() => []);
    } else {
      const newVal = countries.filter(
        el => el.name.common.toLowerCase().includes(filterValue.toLowerCase())
      );
      setSearchCountries(() => newVal);
    }
  },[filterValue])

  const changeNewFilterValue = (val) => setFilterValue(() => val); 

  return (
    <>
      <h1>Data of Countries</h1>
      <div className="App">
        <Filter
          title="Find Countries:"
          filterValue={filterValue}
          changeFilterValue={changeNewFilterValue}
        />
        <hr/>
        <Countries
          filterValue={filterValue}
          countries={searchCountries}
          changeFilterValue={changeNewFilterValue}  
        />
      </div>
    </>
  );
}

export default App;