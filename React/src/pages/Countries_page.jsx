import Menu from '/src/components/Menu'
import Countries from '/src/components/Countries'
/**
 * Countries page 
 * 
 * This page will display information about Countries
 * 
 * @author Karol Fryc W21030911
 */
function Countries_page() {
    const title = (
        <div className="text-center relative">
            <h1 className="text-5xl text-white font-bold my-8">
                COUNTRIES
            </h1>
            <span className="block h-1 bg-yellow-400 w-3/4 mx-auto mt-2"></span>
        </div>
    );

    return (
        <div className="bg-slate-900 min-h-screen">
            <Menu />
            {title}
            <Countries />
        </div>
    )
}
 
export default Countries_page