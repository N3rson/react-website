import Menu from '/src/components/Menu'
import RandomPreview from '/src/components/RandomPreview'
/**
 * Home page
 * 
 * This is the main landing page for the application
 * CHI 2023
 * 
 * @author Karol Fryc W21030911
 */
function Home_page() {
    const title = (
        <div className="text-center relative">
            <h1 className="text-5xl text-white font-bold my-8">
                CHI 2023
            </h1>
            <span className="block h-1 bg-yellow-400 w-3/4 mx-auto mt-2"></span>
        </div>
    );

    return (
        <div className="bg-slate-900 min-h-screen">
            <Menu />
            {title}
            <RandomPreview />
        </div>
    )
}
 
export default Home_page