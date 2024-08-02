import { useEffect, useState } from 'react'
import ShowContent from './ShowContent'

function Content() {
 
    const [contents, setContents] = useState([])
    const [authorAffiliation, setAuthorAffiliation] = useState([])
    const [selectType, setSelectType] = useState('')
    const [page, setPage] = useState(1)

    useEffect( () => {
        fetchData()
        fetchAuthorData()
    },[])
 
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

    const selectContentType = (content) => {
        return selectType === '' || content.type === selectType;
    }
  
    const handleSelectType = (event) => {
        setSelectType(event.target.value)
    }
    const pageSize = 20;
    const filteredContent = contents.filter(selectContentType)
    const startOfPage = (page -1)*pageSize
    const endOfPage = startOfPage + pageSize
    const totalPages = Math.ceil(filteredContent.length / pageSize)
    const lastPage = contents.length < pageSize;
    const firstPage = (page <= 1)
    
        // Functions to change the page
        const nextPage = () => {
            if (lastPage === false) {
                setPage( page => page + 1 )
            }
        }
     
        // Functions to change the page
        const previousPage = () => {
            if (firstPage === false) {
                setPage( page => page - 1 )
            }
        }
     
        // Disable the buttons if we're on the first or last page
        const prevDisabled = (firstPage) ? 'disabled' : ''
        const nextDisabled = (lastPage) ? 'disabled' : ''
        
        

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
            <div>
                <label>Type 
                    <select value={selectType} onChange={handleSelectType}>
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
            {contentsJSX.length===0 ? (
                <p>Content not found</p>
            ) : (
            <> 
            {contentsJSX}
            <p>Page: {page} of {totalPages}</p>
            <button onClick={previousPage} disabled={prevDisabled}>Previous</button>
            <button onClick={nextPage} disabled={nextDisabled}>Next</button>
            </>
            )}
        </>
    )
}
 
export default Content