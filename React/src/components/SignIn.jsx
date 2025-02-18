import { useState, useEffect, useRef } from 'react'
import { useUser } from './UserContext'
/**
 * Sign In
 *
 * This component provides the user interface for signing in and out. It includes input fields for username and password,
 * a sign in button, and a sign out button. The component interacts with a user context to manage authentication states.
 * It fetches user favorites upon successful sign in and validates tokens stored in local storage. Additionally, 
 * it handles sign-in errors by displaying relevant messages to the user.
 *
 * @author Karol Fryc W21030911
 * @generated Comment written with the help of ChatGPT
 */

function SignIn() {
 
    const { signedIn, signIn, signOut, setFavourites } = useUser()
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [errorSigningIn, setErrorSigningIn] = useState(false)
    
    const getFavourites = (token) => {
      fetch('https://w21030911.nuwebspace.co.uk/coursework/favourites',
        {
          method: 'GET',
          headers: new Headers({ "Authorization": "Bearer " + token })
        })
       .then(response => response.json())
       .then(data => { 
        const flattenedData = data.map(fav => fav.content_id)
        setFavourites(flattenedData) 
      })
      .catch(err => {
        throw new Error("Fetching data error " + err.message)
      });
     }
     
    useEffect(() => {
      const validateToken = async () => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
          try {
            const response = await fetch('https://w21030911.nuwebspace.co.uk/coursework/favourites', {
              method: 'GET',
              headers: new Headers({ 'Authorization': 'Bearer ' + savedToken })
            })
    
            if (response.ok) {
              signIn(savedToken, () => getFavourites(savedToken))
            } else {
              signOut()
            }
          } catch (err) {
            signOut()
            throw new Error("Fetching data error " + err.message)
          }
        }
      }
    
      validateToken()
    }, [])

    useEffect(() => {
      let timer
      if (errorSigningIn) {
          timer = setTimeout(() => setErrorSigningIn(false), 5000)
      }

      return () => clearTimeout(timer)
  }, [errorSigningIn])

  useEffect(() => {
      if (signedIn) {
          setErrorSigningIn(false)
      }
  }, [signedIn])

        const handleSignIn = () => {
            const username = usernameRef.current.value
            const password = passwordRef.current.value
            const encodedString = btoa(username + ':' + password)
        
            fetch('https://w21030911.nuwebspace.co.uk/coursework/token', {
              method: 'GET',
              headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(response => {
              if (response.status === 200) {
                return response.json()
              } else {
                setErrorSigningIn(true)
                throw new Error('Failed to sign in')
              }
            })
            .then(data => {
              if (data.token) {
                signIn(data.token, getFavourites)
              }
            })
            .catch(err => {
              signOut()
              throw new Error("Fetching data error " + err.message)
            })
          }

          let inputClass = "p-1 mx-2 rounded-md bg-gray-700 text-white border "
          inputClass += (errorSigningIn ? "border-red-500 " : "border-gray-600 ")
      
          return (
            <div className='bg-slate-800 p-4 text-md flex items-center justify-between'>

            <a href="https://w21030911.nuwebspace.co.uk/coursework/react/" className="text-white">CHI 2023</a>
            
            <div className='flex items-center'>
                  {!signedIn && (
                  <div>
                      <input 
                       type="text" 
                       placeholder='username' 
                       className={inputClass}
                       ref={usernameRef}
                      />
                      <input 
                       type="password" 
                       placeholder='password' 
                       className={inputClass}
                       ref={passwordRef}
                      />
                      <button 
                       className='py-1 px-3 mx-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-800'
                       onClick={handleSignIn}
                      >
                          Sign In
                      </button>
                  </div>
                  )}
                  {signedIn && (
                  <div>
                      <button 
                       className='py-1 px-3 mx-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-800'
                       onClick={signOut}
                      >
                          Sign Out
                      </button>
                  </div>
                  )}
                  {errorSigningIn && <p className="text-red-500 mt-2">Error signing in. Please check your credentials.</p>}
              </div>
              </div>
          )
}
 
export default SignIn