import { Routes, Route } from "react-router-dom"
import Home_page from './pages/Home_page'
import Countries_page from './pages/Countries_page'
import Content_page from './pages/Content_page'
import NotFound_page from './pages/NotFound_page'
import Authors_page from './pages/Authors_page'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import { CountriesProvider } from './components/CountriesContext'
import { ContentProvider } from './components/ContentContext'
import { UserProvider } from './components/UserContext'
import { AuthorsProvider } from './components/AuthorsContext'
/**
 * App
 *
 * This will show each component on the page. It uses Route to navigate between pages
 * and Context (*Provider) to keep some important states on every page. 
 * This helps to fetch every page only once.
 *  
 * @author Karol Fryc W21030911
 */
function App() {

  return (
    
      <div className="App">
        <UserProvider>
        <ContentProvider>
        <CountriesProvider>
        <AuthorsProvider>
        <SignIn/>
        <Routes>
          <Route path="/" element={
          <Home_page />
          }/>
          <Route path="/countries" element={
          <Countries_page />
          }/>
          <Route path="/content" element={
          <Content_page />
          }/>
          <Route path="/authors" element={
          <Authors_page />
          }/>
          <Route path="*" element={
          <NotFound_page/>
          }/>
        </Routes>
      <Footer />
      </AuthorsProvider>
      </CountriesProvider>
      </ContentProvider>
      </UserProvider>
      </div>
    
  )
}

export default App
