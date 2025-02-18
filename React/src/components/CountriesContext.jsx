import { useState, createContext } from 'react'
/**
 * CountriesContext
 * 
 * CountriesContext manages and shares country data across components. It allows for a 
 * streamlined way to provide country information to various parts of the application. CountriesProvider 
 * encapsulates children components and provides them access to the countries data. It maintains 
 * the state of the list of countries and a flag to indicate if the countries data has been fetched.
 *
 * @author Karol Fryc W21030911 
 * @generated Comment written with the help of ChatGPT
 */
export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);

    return (
        <CountriesContext.Provider value={{ countries, setCountries, hasFetched, setHasFetched }}>
            {children}
        </CountriesContext.Provider>
    );
};