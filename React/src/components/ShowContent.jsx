import { useEffect, useState } from 'react'
function ShowContent(props) {
    const [visible, setVisible] = useState(false)
    const [filteredAuthors, setFilteredAuthors] = useState([]);

    useEffect( () => {
        const contentAuthors = props.authorAffiliation.filter(
            (author) => author.contentID === props.content.id
        )

        setFilteredAuthors(contentAuthors)
    },[props.authorAffiliation, props.content.id]);
    
    return (
        <section>
            <h3 onClick={() => setVisible( visible => !visible )}>{props.content.title}</h3>
            {visible && <>
                <div>
                <p>{props.content.abstract}</p>
                <p>Authors:</p>
                {filteredAuthors.map((author, j) => (
                    <div key={j}>
                        <p>{author.authorName}, {author.country}, {author.city}, {author.institution}</p>
                    </div>           
))}
            <p>Type: {props.content.type}</p>
            <p>Awards: {props.content.award}</p>
                </div>
            </>}
        </section>
    )
}
export default ShowContent