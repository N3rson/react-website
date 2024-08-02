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
    const title = <h1>CHI 2023</h1>

    return (
        <>
            <Menu />
            {title}
            <RandomPreview />
        </>
    )
}
 
export default Home_page