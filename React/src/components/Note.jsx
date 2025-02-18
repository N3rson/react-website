import { useEffect, useState } from 'react'
/**
 * Note
 *
 * This component is designed to allow users to add and save notes for a specific content item. It fetches an existing note from an API
 * based on the content ID passed via props and provides a textarea for users to edit or add new notes. The component handles both the 
 * fetching and posting of notes to an API, managing authorization through tokens stored in localStorage. It includes a save function 
 * to post updated note data back to the server. A temporary message is displayed to indicate successful saving of the note. 
 * Error handling is implemented for both fetch and post requests.
 * 
 * @author Karol Fryc W21030911
 * @generated Comment written with the help of ChatGPT
 */
function Note(props) {

    const [ note, setNote] = useState('')
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
       fetch('https://w21030911.nuwebspace.co.uk/coursework/note?content_id=' + props.content.id,
          {
            method: 'GET',
            headers: new Headers( 
              { "Authorization": "Bearer "+localStorage.getItem('token') }
            ),
          }
        ).then(response => {
            if (response.status === 200)  {
                return response.json()
            } else if (response.status === 204) {
                return {}
            } else {
                throw new Error("invalid response: " + response.status)
            }
        })
        .then(data => {
            if(data && data[0].note){
                setNote(data[0].note)
            }
        })
        .catch(err => {
            throw new Error("Fetching data error " + err.message)
        })
    },[])
 
    const saveNote = () => {
        let formData = new FormData();
        formData.append('note', note)
          
        fetch('https://w21030911.nuwebspace.co.uk/coursework/note?content_id=' + props.content.id,
          {
            method: 'POST',
            headers: new Headers({"Authorization":"Bearer "+localStorage.getItem('token')}),
            body: formData,
          }
        )
        .then(response => {
              if (response.status === 200) {
                return response.json()
              } else if (response.status === 204) {
                setShowSavedMessage(true);
                setTimeout(() => setShowSavedMessage(false), 3000);
                return
            } else{
                throw new Error("invalid response: " + response.status)
            }
        })
            .catch(err => {
                throw new Error("Fetching data error " + err.message)
        })
    }
    
    return (
        <div className="flex flex-col p-5 bg-gray-700 text-white rounded-lg m-4">
            <textarea 
                name="note"
                placeholder="Leave your note here" 
                rows="5" 
                cols="50" 
                maxLength="250" 
                className="p-2 bg-gray-800 text-white rounded-md"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <input 
                name="save"
                type="submit" 
                value="save" 
                className="w-full my-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-400 cursor-pointer"
                onClick={saveNote}
            />
            {showSavedMessage && <p className="text-yellow-400">Note Saved</p>}
        </div>
    )
}
 
 
export default Note