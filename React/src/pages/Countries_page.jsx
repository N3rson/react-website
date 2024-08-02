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
    const title = <h1>Countries</h1>

    return (
        <>
            <Menu />
            {title}
            <Countries />
        </>
    )
}
 
export default Countries_page