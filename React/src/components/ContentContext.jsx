import { useState, createContext } from 'react'
/**
 * ContentContext
 * 
 * ContentContext helps to pass content data through the component tree without 
 * having to pass props down manually at every level. ContentProvider wraps its children 
 * and provides the content data to them. It maintains the state of contents, author affiliations, and a flag 
 * indicating whether the content has been fetched.
 *
 * @author Karol Fryc W21030911 
 * @generated Comment written with the help of ChatGPT
 */
export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([])
    const [authorAffiliation, setAuthorAffiliation] = useState([])
    const [hasFetched, setHasFetched] = useState(false);

    return (
        <ContentContext.Provider value={{ contents, setContents, authorAffiliation, setAuthorAffiliation, hasFetched, setHasFetched }}>
            {children}
        </ContentContext.Provider>
    );
};