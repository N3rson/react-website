/**
 * Footer
 * 
 * This is the footer component. Displays the short info about the author of the website.
 * 
 * @author Karol Fryc W21030911
 */
function Footer() {
    return (
        <footer className="bg-slate-950 text-white text-center p-6 border-t-4 border-yellow-400">
            <p className="text-lg font-semibold">Karol Fryc</p>
            <p className="text-md">W21030911</p>
            <p className="text-sm mt-2">
                Coursework assignment for KF6012 Web Application Integration, 
                Northumbria University.
            </p>
        </footer>
    )
}
 
export default Footer;