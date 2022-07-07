import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({countries, setSearchTerm}) => {

  
 

  if (countries.length === 1){
    const country = countries[0]
    return (<>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map((val) => <li key={val}>{val}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common + "'s flag"}/>
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