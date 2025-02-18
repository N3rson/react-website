/**
    * PageControl
    *
    * This component is used for pagination control. It allows the user to navigate through 
    * pages by providing 'Previous' and 'Next' buttons. The component takes the current page and total number of pages as props 
    * and enables or disables the navigation buttons based on the page context (i.e., disabling the 'Previous' button on the 
    * first page and the 'Next' button on the last page). The setPage function, also passed as a prop, is used to update the 
    * current page state in the parent component, allowing for dynamic page navigation.
    * 
    * @author Karol Fryc W21030911
    * @generated Comment written with the help of ChatGPT
*/
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
     
        const prevDisabled = (firstPage) ? 'disabled' : ''
        const nextDisabled = (lastPage) ? 'disabled' : ''

        return (
            <div className="text-center my-4">
                <p className="text-white mb-2">Page: {props.page} of {props.totalPages}</p>
                <button 
                    onClick={previousPage} 
                    disabled={prevDisabled} 
                    className="mx-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:bg-gray-900"
                >
                    Previous
                </button>
                <button 
                    onClick={nextPage} 
                    disabled={nextDisabled} 
                    className="mx-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:bg-gray-900"
                >
                    Next
                </button>
            </div>
        )

    }
    export default PageControl