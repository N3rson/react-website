import Menu from '/src/components/Menu'
import Content from '/src/components/Content'
 /**
 * Content page
 * 
 * Shows content and has all main components of the main page.
 * 
 * @author Karol Fryc W21030911
 */
function Content_page() {
    const title = (
        <div className="text-center relative">
            <h1 className="text-5xl text-white font-bold my-8">
                CONTENT
            </h1>
            <span className="block h-1 bg-yellow-400 w-3/4 mx-auto mt-2"></span>
        </div>
    )

    return (
        <div className="bg-slate-900 min-h-screen">
            <Menu />
            {title}
            <Content />
        </div>
    )
}
 
export default Content_page