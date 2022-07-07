import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState({current: {temp:0, wind_speed:0, weather:{icon:'03d'}}})

  
  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [country])


  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature: {weather.current.temp}</div>
      <img src={`http://openweathermap.org/img/wn/${weather.current.weather.icon}@2x.png`} />\
      <div>wind: {weather.current.wind_speed}</div>
      
    </div>
  )
}

const Countries = ({countries, setSearchTerm}) => {
  
  
  if (countries.length === 1){
   

    const country = countries[0]
    console.log(country);
    console.log(process.env.REACT_APP_API_KEY)
    return (<>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map((val) => <li key={val}>{val}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common + "'s flag"}/>
    <Weather country={country}/>
    </>)
  }

  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  return (
    <div>
        {countries.map((country) => 
        <div key={country.name.common}>
        {country.name.common}
          <button onClick={() => setSearchTerm(country.name.common)} key={country.name.common}>show</button>
          </div>)}
    </div>
  )

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(event.target.value)
  }

  const displayableCountries = countries.filter((a) => a.name.common.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSearchChange}/>
      <Countries countries={displayableCountries} setSearchTerm={setSearchTerm}/>
    </div>
  )
}

export default App