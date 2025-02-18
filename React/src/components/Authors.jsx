import { useContext, useState, useEffect } from 'react'
import { AuthorsContext } from './AuthorsContext'
import PageControl from './PageControl'
import Search from './Search'
/**
 * Authors
 *
 * This component is responsible for displaying a list of authors. It utilizes the AuthorsContext to manage 
 * and access author data. Authors can be filtered based on search criteria and whether they have received awards.
 * The component fetches author data from my API on the initial render if it hasn't been fetched before.
 * 
 * @author Karol Fryc W21030911
 */
function Authors (){

    const{authors, setAuthors, hasFetched, setHasFetched} = useContext(AuthorsContext)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [awarded, setAwarded] = useState(false)

    useEffect(() => {
        if (!hasFetched) {
            fetchData()
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
     
    const handleAuthorsJSON = (json) => {
        if (json.constructor === Array) {
            setAuthors(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const fetchData = () => {
        const authorsEndpoint = 'https://w21030911.nuwebspace.co.uk/coursework/authors'
        fetch(authorsEndpoint)
          .then((response) => handleResponse(response))
          .then((json) => {
            handleAuthorsJSON(json)
          })
          .catch((err) => {
            throw new Error("Fetching data error " + err.message)
          })
      }

      const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const searchAuthors = (authors) => {
        const foundInAuthors = authors.name.toLowerCase().includes(search.toLowerCase())
        return foundInAuthors
    }

    const toggleShowAwarded = () => {
        setAwarded(prev => !prev)
    }

    const pageSize = 20
    const filteredAuthors = awarded ? authors.filter(authors => authors.award !== "No awards").filter(searchAuthors) : authors.filter(searchAuthors);
    const totalPages = Math.ceil(filteredAuthors.length / pageSize)
    const startOfPage = (page -1)*pageSize
    const endOfPage = startOfPage + pageSize

    const authorsJSX = filteredAuthors.slice(startOfPage, endOfPage).map((author, index) => (
        <div key={index} className="bg-gray-700 text-white p-3 rounded-lg">
            <div className="text-lg font-semibold text-center">{author.name}</div>
            <div className="text-center text-yellow-300 text-sm">{author.award}</div> 
        </div>
    ));
    
    return (
        <>
            <div className="flex justify-between items-center my-4 mx-auto px-4" style={{ maxWidth: '75%' }}>
                <div className="flex-1"></div>
                <div className="flex-1 text-center">
                    <p className="text-lg text-white mb-2">Search for an author:</p>
                    <Search search={search} handleSearch={handleSearch} />
                </div>
                <div className="flex-1 flex justify-end">
                    <button 
                        onClick={toggleShowAwarded} 
                        className="bg-yellow-400 text-black p-2 rounded whitespace-nowrap"
                    >
                        {awarded ? 'Show All Authors' : 'Show Authors with Awards'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mx-auto" style={{ maxWidth: '75%' }}>
                {authorsJSX}
            </div>
            <div className="text-center my-4">
                <PageControl
                    page={page} 
                    setPage={setPage} 
                    totalPages={totalPages}     
                />
            </div>
        </>
    )
}

export default Authors;