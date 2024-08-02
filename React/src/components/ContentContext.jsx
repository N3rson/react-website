import { useEffect, useState, createContext } from 'react'

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([])
    const [authorAffiliation, setAuthorAffiliation] = useState([])
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (!hasFetched) {
            fetchData()
            fetchAuthorData()
            setHasFetched(true);
        }
    }, [hasFetched]);

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }
     
    const handleContentJSON = (json) => {
        if (json.constructor === Array) {
            setContents(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const fetchData = () => {
        const contentEndpoint = 'https://w21030911.nuwebspace.co.uk/coursework/content';
        fetch(contentEndpoint)
          .then((response) => handleResponse(response))
          .then((json) => {
            handleContentJSON(json);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      const fetchAuthorData = () => {
        const authorAffiliationEndpoint = 'https://w21030911.nuwebspace.co.uk/coursework/author-and-affiliation'
        fetch(authorAffiliationEndpoint)
          .then((response) => handleResponse(response))
          .then((json) => {
            handleAuthorJSON(json);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      const handleAuthorJSON = (json) => {
        if (json.constructor === Array) {
            setAuthorAffiliation(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    return (
        <ContentContext.Provider value={{ contents, authorAffiliation }}>
            {children}
        </ContentContext.Provider>
    );
};