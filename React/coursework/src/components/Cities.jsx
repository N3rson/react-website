import { useState } from 'react'
 
 
function Cities(props) {
    const [visible, setVisible] = useState(false)
 
 
    return (
        <section>
            <h3 onClick={() => setVisible(visible => !visible)}>{props.country.country}</h3>
            {visible && <p>{props.country.cities}</p>}
        </section>
    )
}
export default Cities