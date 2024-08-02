import { useEffect, useState } from 'react'
 
 
function RandomPreview() {
 
 
    const [preview, setPreview] = useState([])
 
 
    useEffect( () => {
        fetchData()
    },[])
 
 
    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }
     
    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setPreview(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
     
    const fetchData = () => { 
        fetch('https://w21030911.nuwebspace.co.uk/coursework/preview?limit=1')
        .then( response => handleResponse(response) )
        .then( json => handleJSON(json) )
        .catch( err => { console.log(err.message) })
    }
 
 
    const previewJSX = preview.map( (preview, i) => 
        <section key={i}>
            <h3>{preview.title}</h3>
            <a href= {preview.preview_video}>{preview.preview_video}</a>
        </section>
    ) 
 
 
    return (
        <>
            <h2>Preview Video</h2>
            {previewJSX}
        </>
    )
}
 
export default RandomPreview