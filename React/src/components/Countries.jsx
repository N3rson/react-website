import { useEffect, useState } from 'react'
import Cities from './Cities'
import Search from './Search'

function Countries() {
 
 
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
 
    useEffect( () => {
        fetchData()
    },[])
 
 
    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }
     
    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setCountries(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const fetchData = () => { 
        fetch('https://w21030911.nuwebspace.co.uk/coursework/country')
        .then( response => handleResponse(response) )
        .then( json => handleJSON(json) )
        .catch( err => { console.log(err.message) })
    }

    // function used for filtering countries  
    const searchCountries = (country) => {
        const foundInCountry = country.country.toLowerCase().includes(search.toLowerCase())
        return foundInCountry
    }

    const CountriesJSX = countries.filter(searchCountries).map( (country, i) => 
   <Cities key={i} count={i} country={country} /> 
    ) 
 
    // update state when the search input changes
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
 
    return (
        <>
            <h2>A list of countries</h2>
            <p>Search for a country: </p><Search search={search} handleSearch={handleSearch} />
            {CountriesJSX}
        </>
    )
}
 
export default Countries