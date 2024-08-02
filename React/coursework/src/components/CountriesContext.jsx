import { useEffect, useState, createContext } from 'react'

export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (!hasFetched) {
            fetchData();
            setHasFetched(true);
        }
    }, [hasFetched]);

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
            console.log("Error fetching data:", err.message);
            // Optionally, you can set an error state here to indicate fetching errors
        });
    };

    return (
        <CountriesContext.Provider value={{ countries }}>
            {children}
        </CountriesContext.Provider>
    );
};