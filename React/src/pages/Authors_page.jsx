import Menu from '/src/components/Menu'
import Authors from '/src/components/Authors'
 /**
 * Authors page
 * 
 * Shows authors and has all main components of the main page.
 * 
 * @author Karol Fryc W21030911
 */
function Authors_page() {
    const title = (
        <div className="text-center relative">
            <h1 className="text-5xl text-white font-bold my-8">
                AUTHORS
            </h1>
            <span className="block h-1 bg-yellow-400 w-3/4 mx-auto mt-2"></span>
        </div>
    )

    return (
        <div className="bg-slate-900 min-h-screen">
            <Menu />
            {title}
            <Authors />
        </div>
    )
}
 
export default Authors_page