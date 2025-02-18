import Menu from '/src/components/Menu'
import error from '/src/assets/error404.png'
 /**
 * Not Found Page
 * 
 * Shows an Error 404 Not found because this endpoint doesn't exist.
 * 
 * @author Karol Fryc W21030911
 */
function NotFound_page() {

    const title = (
        <div className="flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl text-white font-bold my-8">
                404 Not Found
            </h1>
            <span className="block h-1 bg-yellow-400 w-3/4 mx-auto"></span>
            <p className="text-xl mb-4 mt-4">Oops! The page you're looking for doesn't exist.</p>
            <div className="mb-4">
                <img src={error} alt="Not Found" />
            </div>
            <a href="https://w21030911.nuwebspace.co.uk/coursework/react/" className="text-yellow-400 hover:text-yellow-500 text-lg">
                Return to Home
            </a>
        </div>
    )

    return (
        <div className="bg-slate-900 min-h-screen">
            <Menu />
            {title}
        </div>
    )
}

export default NotFound_page;