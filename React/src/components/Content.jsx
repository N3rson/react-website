import { useContext, useState, useEffect } from 'react'
import ShowContent from './ShowContent'
import { ContentContext } from './ContentContext'
import PageControl from './PageControl'
import { useUser } from './UserContext'
import Search from './Search'
/**
 * Content
 *
 * This component serves as a primary display for content fetched from API created by me. It supports
 * filtering content by type, searching through content title, showing favorites for signed-in users, and pagination. The component uses the ContentContext 
 * for managing and displaying content and author affiliations. It handles the fetching and parsing of data from the API, 
 * and displays the content using the ShowContent component. Error handling is included for API response and JSON parsing.
 * The PageControl component is used for managing pagination.
 *
 * @author Karol Fryc W21030911 
 * @generated Comment written with the help of ChatGPT
 */
function Content() {
 
    const { contents, setContents, authorAffiliation, setAuthorAffiliation, hasFetched, setHasFetched } = useContext(ContentContext)
    const [selectType, setSelectType] = useState('')
    const [page, setPage] = useState(1)
    const { favourites, signedIn } = useUser()
    const [showFavourites, setShowFavourites] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!hasFetched) {
            fetchData()
            fetchAuthorData()
            setHasFetched(true)
        }
    }, [])

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
        const contentEndpoint = 'https://w21030911.nuwebspace.co.uk/coursework/content'
        fetch(contentEndpoint)
          .then((response) => handleResponse(response))
          .then((json) => {
            handleContentJSON(json)
          })
          .catch((err) => {
            throw new Error("Fetching data error " + err.message)
          })
      }

      const fetchAuthorData = () => {
        const authorAffiliationEndpoint = 'https://w21030911.nuwebspace.co.uk/coursework/author-and-affiliation'
        fetch(authorAffiliationEndpoint)
          .then((response) => handleResponse(response))
          .then((json) => {
            handleAuthorJSON(json)
          })
          .catch((err) => {
            throw new Error("Fetching data error " + err.message)
          })
      }

      const handleAuthorJSON = (json) => {
        if (json.constructor === Array) {
            setAuthorAffiliation(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const selectContentType = (content) => {
        return selectType === '' || content.type === selectType
    }
  
    const handleSelectType = (event) => {
        setSelectType(event.target.value)
    }
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const searchContent = (content) => {
        const foundInContent = content.title.toLowerCase().includes(search.toLowerCase())
        return foundInContent
    }
    const toggleShowFavourites = () => {
        setShowFavourites(prev => !prev)
    }

    const pageSize = 20
    const typeFilteredContent = contents.filter(selectContentType)
    const filteredContent = showFavourites ? typeFilteredContent.filter(content => favourites.includes(content.id)).filter(searchContent) : typeFilteredContent.filter(searchContent);
    const totalPages = Math.ceil(filteredContent.length / pageSize)
    const startOfPage = (page -1)*pageSize
    const endOfPage = startOfPage + pageSize
    
    const contentsJSX = filteredContent
        .slice(startOfPage, endOfPage)
        .map( 
            (content, i) => 
            <ShowContent key={i + content.title}
            content={content} 
            authorAffiliation={authorAffiliation} 
            />
        ) 

return (
    <>
        <div className="flex justify-between items-center my-4 w-full max-w-2xl mx-auto">
            <div className="flex-none">
                <label className="text-white font-semibold">Type 
                    <select className="ml-2 p-2 rounded bg-gray-700 text-white" value={selectType} onChange={handleSelectType}>
                    <option value=''>All content</option>
                        <option value='Course'>Course</option>
                        <option value='Doctoral Consortium'>Doctoral Consortium</option>
                        <option value='Event'>Event</option>
                        <option value='Late-Breaking Work'>Late-Breaking Work</option>
                        <option value='Paper'>Paper</option>
                        <option value='Poster'>Poster</option>
                        <option value='Work-in-Progress'>Work-in-Progress</option>
                        <option value='Workshop'>Workshop</option>
                        <option value='Case Study'>Case Study</option>
                        <option value='AltCHI'>AltCHI</option>
                        <option value='SIG'>SIG</option>
                        <option value='Keynote'>Keynote</option>
                        <option value='Interactivity'>Interactivity</option>
                        <option value='Journal'>Journal</option>
                        <option value='Symposia'>Symposia</option>
                        <option value='Competitions'>Competitions</option>
                    </select>
                </label>
            </div>
            <div className="flex-grow mx-9">
                <Search search={search} handleSearch={handleSearch} />
                </div>
            {signedIn && (
                <div className="flex-none">
                <button 
                    className="bg-yellow-400 text-black p-2 rounded"
                    onClick={toggleShowFavourites}
                >
                    {showFavourites ? 'Show All Content' : 'Show Favourites Only'}
                </button>
                </div>
            )}
        </div>
        {contentsJSX.length === 0 ? (
            <p className="text-white text-center">Content not found</p>
        ) : (
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                {contentsJSX}
                <PageControl
                    page={page} 
                    setPage={setPage} 
                    totalPages={totalPages}
                />
            </div>
        )}
    </>
)
}
export default Content