import { NavLink, useLocation } from 'react-router-dom';

/**
 * Main menu
 * 
 * This will be the main navigation component in the app, with links to all main pages
 * 
 * @author Karol Fryc W21030911
 */

function Menu() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'text-yellow-400 hover:text-yellow-500' : '';

    return (
        <nav className="bg-slate-950 text-white p-4">
            <ul className="flex justify-center space-x-8">
                <li>
                    <NavLink 
                      to="/" 
                      className={`transition duration-300 ease-in-out hover:text-gray-300 ${isActive('/')}`}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                      to="/countries" 
                      className={`transition duration-300 ease-in-out hover:text-gray-300 ${isActive('/countries')}`}
                    >
                        Countries
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                      to="/content" 
                      className={`transition duration-300 ease-in-out hover:text-gray-300 ${isActive('/content')}`}
                    >
                        Content
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                      to="/authors" 
                      className={`transition duration-300 ease-in-out hover:text-gray-300 ${isActive('/authors')}`}
                    >
                        Authors
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Menu;