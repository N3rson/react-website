import { useEffect, useState } from 'react'
import { useUser } from './UserContext'
import Note from './Note'
/**
 * ShowContent
 *
 * This component displays individual content items with various details. It allows 
 * users to toggle visibility of these details. For signed-in users, it provides the ability to mark or unmark content 
 * as a favorite and to add personal notes using the Note component. The component interacts with the UserContext to handle
 * user authentication status and favorite items. It also manages fetching author affiliations related to the content and 
 * dynamically displays them. The component includes functionality for adding and removing items from favorites through 
 * API calls, updating the favorites in the UserContext accordingly.
 * 
 * @author Karol Fryc W21030911
 * @generated Comment written with the help of ChatGPT
 */
function ShowContent(props) {
    const [visible, setVisible] = useState(false)
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const { signedIn, setSignedIn, favourites, setFavourites} = useUser()
    

    useEffect( () => {
        const contentAuthors = props.authorAffiliation.filter(
            (author) => author.contentID === props.content.id
        )

        setFilteredAuthors(contentAuthors)
    },[props.authorAffiliation, props.content.id]);
    
    const setFavourite = () => {
 
        let formData = new FormData();
        formData.append('content_id', props.content.id)
          
        fetch('https://w21030911.nuwebspace.co.uk/coursework/favourites',
          {
            method: 'POST',
            headers: new Headers({"Authorization":"Bearer "+localStorage.getItem('token')}),
            body: formData,
          }
        )
        .then(res => {
              if ((res.status === 200) || (res.status === 204)) {
                setFavourites(favourites => [...favourites, props.content.id])
              } else{
                setSignedIn(false)
            }
        })
        .catch(err => {
            throw new Error("Fetching data error " + err.message)
        });
      }

      const removeFavourite = () => {
        fetch('https://w21030911.nuwebspace.co.uk/coursework/favourites?content_id='+props.content.id,
          {
           method: 'DELETE',
           headers: new Headers({"Authorization": "Bearer "+localStorage.getItem('token')}),
          }
         )
         .then(res => {
            if ((res.status === 200) || (res.status === 204)) {
                setFavourites(favourites => favourites.filter(
                fav => fav !== props.content.id
                ))
            } else{
                setSignedIn(false)
            }
         })
         .catch(err => {
            throw new Error("Fetching data error " + err.message)
        });
      }

    const showFavourite = (favourites.includes(props.content.id)) 
    ? <span onClick={removeFavourite}>💘</span>
    : <span onClick={setFavourite}>🔲</span>

    const isFavourite = signedIn ? showFavourite : ''
    const showNote = signedIn ? <Note content={props.content}/> : ''
    
    return (
      <section className="bg-gray-700 text-white p-4 m-4 rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
              <h3 onClick={() => setVisible(visible => !visible)} className="text-xl font-semibold cursor-pointer hover:text-gray-300">
                  {props.content.title}
              </h3>
              <p>{isFavourite}</p>
          </div>
          {visible && (
              <div className="mt-2">
                  <p className="mt-2 text-justify">{props.content.abstract}</p>
                  <div className="mt-4 text-center">
                    <p className="font-semibold mb-2">Authors:</p>
                    <div className="w-full text-center">
                        <div className="text-justify inline-block mx-auto">
                            {filteredAuthors.map((author, j) => (
                                <p key={j} className="text-sm">{author.authorName}, {author.country}, {author.city}, {author.institution}</p>
                            ))}
                        </div>
                    </div>
                </div>
                  <p className="mt-4 text-center">Type: <span className="font-semibold">{props.content.type}</span></p>
                  <p className="mt-2 text-center">Awards: <span className="font-semibold">{props.content.award}</span></p>
                  <div className="mt-4">
                      {showNote}
                  </div>
              </div>
          )}
      </section>
    )
}
export default ShowContent