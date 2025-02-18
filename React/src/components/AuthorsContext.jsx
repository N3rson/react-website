import { useState, createContext } from 'react'
/**
 * AuthorsContext
 *
 * AuthorsContext is a React context created to manage and distribute author data across the component tree. 
 * It provides a convenient way to share this data without having to pass props through every level of the component hierarchy.
 *
 *
 * @author Karol Fryc W21030911
 */
export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [authors, setAuthors] = useState([])
    const [hasFetched, setHasFetched] = useState(false);

    return (
        <AuthorsContext.Provider value={{ authors, setAuthors, hasFetched, setHasFetched }}>
            {children}
        </AuthorsContext.Provider>
    );
};