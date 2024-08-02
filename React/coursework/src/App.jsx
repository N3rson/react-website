import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import Home_page from './pages/Home_page'
import Countries_page from './pages/Countries_page'
import Content_page from './pages/Content_page'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import { CountriesProvider } from './components/CountriesContext'
import { ContentProvider } from './components/ContentContext'
import './App.css'
/**
 * App
 *
 * This will show each component on the page  
 *  
 * @author Karol Fryc W21030911
 */
function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [favourites, setFavourites] = useState([])

  return (
    <CountriesProvider>
      <ContentProvider>
      <div className="App">
        <SignIn 
        signedIn={signedIn} 
        setSignedIn={setSignedIn} 
        favourites={favourites}
        setFavourites={setFavourites}/>
        <Routes>
          <Route path="/" element={<Home_page />}/>
          <Route path="/countries" element={<Countries_page />}/>
          <Route path="/content" element={<Content_page />}/>
          <Route path="*" element={<p>404 Not Found</p>}/>
        </Routes>
      <Footer />
      </div>
      </ContentProvider>
    </CountriesProvider>
  )
}

export default App
