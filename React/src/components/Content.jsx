import { useContext, useState } from 'react'
import ShowContent from './ShowContent'
import { ContentContext } from './ContentContext'
import PageControl from './PageControl'

function Content() {
 
    const { contents, authorAffiliation } = useContext(ContentContext)
    const [selectType, setSelectType] = useState('')
    const [page, setPage] = useState(1)

    const selectContentType = (content) => {
        return selectType === '' || content.type === selectType;
    }
  
    const handleSelectType = (event) => {
        setSelectType(event.target.value)
    }

    const pageSize = 20;
    const filteredContent = contents.filter(selectContentType)
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
            <PageControl
            page={page} 
            setPage={setPage} 
            totalPages={totalPages}
            />
            </>
            )}
        </>
    )
}
 
export default Content