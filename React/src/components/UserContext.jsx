import { createContext, useState, useContext } from 'react'
/**
  * UserContext
  * 
  * UserContext manages user authentication and information. useUser is a custom 
  * hook that simplifies the process of accessing the user context in functional components. UserProvider wraps 
  * its children and provides user authentication state and functions to them. It handles 
  * token management, user sign-in, and sign-out functionalities, along with maintaining the user's favorite items. 
  *
  * @author Karol Fryc W21030911 
  * @generated Comment written with the help of ChatGPT
*/
const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token')
    return savedToken && !isTokenExpired(savedToken) ? savedToken : null
  })
  const [signedIn, setSignedIn] = useState(!!token)
  const [favourites, setFavourites] = useState([])

  const signIn = (newToken, callback) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setSignedIn(true)
    if (callback) {
        callback(newToken)
      }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    setToken(null)
    setSignedIn(false)
    setFavourites([])
  }

  return (
    <UserContext.Provider value={{ token, signedIn, signIn, signOut, favourites, setFavourites}}>
      {children}
    </UserContext.Provider>
  )
}

const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token)
  if (!decodedToken) return true
  const currentTime = Date.now() / 1000
  return decodedToken.exp < currentTime
}

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch (error) {
    return null
  }
}