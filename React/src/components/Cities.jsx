import { useState } from 'react'
 /**
 * Cities
 *
 * This component returns a list of cities when user clicked on a specific country.
 *  
 * @author Karol Fryc W21030911
 */
function Cities(props) {
    const [visible, setVisible] = useState(false);

    const cities = Array.isArray(props.country.cities) 
        ? props.country.cities 
        : props.country.cities.split(', ')

    return (
        <section className="bg-gray-700 text-white p-4 my-2 rounded-lg w-full max-w-md mx-auto">
            <h3 onClick={() => setVisible(visible => !visible)} className="text-2xl font-semibold cursor-pointer hover:text-gray-300 text-center">
                {props.country.country}
            </h3>
            {visible && (
                <ul className="list-none mt-2 text-center text-yellow-300">
                    {cities.map((city, index) => (
                        <li key={index} className="my-1">{city}</li>
                    ))}
                </ul>
            )}
        </section>
    )
}
export default Cities