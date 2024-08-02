import { useContext, useState } from 'react'
import Cities from './Cities'
import Search from './Search'
import { CountriesContext } from './CountriesContext'

function Countries() {
 
    const { countries } = useContext(CountriesContext)
    const [search, setSearch] = useState('')

    // function used for filtering countries  
    const searchCountries = (country) => {
        const foundInCountry = country.country.toLowerCase().includes(search.toLowerCase())
        return foundInCountry
    }

    const CountriesJSX = countries.filter(searchCountries).map( (country, i) => 
   <Cities key={i} country={country} /> 
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