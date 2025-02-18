import { useEffect, useState } from 'react'
 /**
 * RandomPreview
 *
 * This component is designed to fetch and display a random preview item from my API.
 * 
 * @author Karol Fryc W21030911
 * @generated regExp for youtube video link generated using ChatGPT
 */
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
        .catch( err => { throw new Error("Fetching data error " + err.message) })
    }
 
    const extractVideoID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return null;
        }
    }
    const previewJSX = preview.map((preview, i) => {
        const videoID = extractVideoID(preview.preview_video);
        const embedUrl = `https://www.youtube.com/embed/${videoID}`;

        return (
            <section key={i} className="flex flex-col items-center justify-center bg-gray-700 text-white p-4 my-4 rounded-lg w-2/4 mx-auto">
                <h3 className="text-xl font-semibold">{preview.title}</h3>
                <iframe 
                    width="560" 
                    height="315" 
                    src={embedUrl} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </section>
        )
    });

    return (
        <>
            <h2 className="text-3xl text-white font-bold text-center my-4">Preview Video</h2>
            {previewJSX}
        </>
    )
}
 
export default RandomPreview;