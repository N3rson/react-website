import { Link } from 'react-router-dom';
 
/**
 * Main menu
 * 
 * This will be the main navigation component in 
 * the app, with links to all main pages
 * 
 * @author Karol Fryc W21030911
 */
function Menu() {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/countries">Countries</Link></li>
            <li><Link to="/content">Content</Link></li>
        </ul>
    )
}
 
export default Menu;