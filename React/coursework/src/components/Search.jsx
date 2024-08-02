import { useEffect, useState } from 'react'

function Search(props) {

    return (
        <input type="text" value={props.search} onChange={props.handleSearch} />
    )
}
export default Search