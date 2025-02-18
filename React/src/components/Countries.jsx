import { useContext, useState, useEffect } from 'react'
import Cities from './Cities'
import Search from './Search'
import { CountriesContext } from './CountriesContext'
/**
    * Countries
    *
    * This component serves as a container for displaying a list of countries. It fetches country data from my API
    * and provides a search functionality to filter the displayed countries. The component makes use of the CountriesContext
    * for accessing and setting the countries' data. It includes error handling for fetch requests and JSON responses. 
    * 
    * @author Karol Fryc W21030911 
    * @generated Comment written with the help of ChatGPT
*/
function Countries() {
 
    const { countries, setCountries, hasFetched, setHasFetched } = useContext(CountriesContext)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!hasFetched) {
            fetchData();
            setHasFetched(true);
        }
    }, []);

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Invalid response: " + response.status);
        }
    };

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setCountries(json);
        } else {
            throw new Error("Invalid JSON: " + json);
        }
    };

    const fetchData = () => { 
        fetch('https://w21030911.nuwebspace.co.uk/coursework/country')
        .then(response => handleResponse(response))
        .then(json => handleJSON(json))
        .catch(err => {
            throw new Error("Fetching data error " + err.message)
        });
    };

    const searchCountries = (country) => {
        const foundInCountry = country.country.toLowerCase().includes(search.toLowerCase())
        return foundInCountry
    }

    const CountriesJSX = countries.filter(searchCountries).map((country, i) => 
   <Cities key={i} country={country} /> 
) 

const handleSearch = (event) => {
    setSearch(event.target.value)
}

return (
    <>
        <h2 className="text-3xl text-white font-bold text-center my-4">A list of countries</h2>
        <div className="text-center my-4">
            <p className="text-lg text-white mb-2">Search for a country:</p>
            <Search search={search} handleSearch={handleSearch} />
        </div>
        <div className="flex flex-col items-center text-center">
            {CountriesJSX}
        </div>
    </>
)
}
 
export default Countries