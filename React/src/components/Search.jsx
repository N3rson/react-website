/**
 * Search
 *
 * This component renders a search input field used for filtering or searching content.
 * 
 * @author Karol Fryc W21030911
 */
function Search(props) {
    return (
        <input 
            type="text" 
            value={props.search} 
            onChange={props.handleSearch} 
            className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:border-yellow-300 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            placeholder="Search..."
        />
    )
}
export default Search