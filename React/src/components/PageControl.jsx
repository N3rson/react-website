function PageControl(props) {

    const lastPage = props.page >= props.totalPages;
    const firstPage = (props.page <= 1)
    
        const nextPage = () => {
            if (lastPage === false) {
                props.setPage( currentPage => currentPage + 1 )
            }
        }
     
        const previousPage = () => {
            if (firstPage === false) {
                props.setPage( currentPage => currentPage - 1 )
            }
        }
     
        // Disable the buttons if we're on the first or last page
        const prevDisabled = (firstPage) ? 'disabled' : ''
        const nextDisabled = (lastPage) ? 'disabled' : ''

        return (
            <div>
            <p>Page: {props.page} of {props.totalPages}</p>
            <button onClick={previousPage} disabled={prevDisabled}>Previous</button>
            <button onClick={nextPage} disabled={nextDisabled}>Next</button>
            </div>
        )

    }
    export default PageControl