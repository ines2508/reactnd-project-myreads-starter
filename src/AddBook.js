import React from 'react'

const AddBook = ({changePage}) => {
    
        return(

        <div className="open-search">
            <button onClick={() => changePage(true)}>Add a book</button>
        </div>
        )
    
}

export default AddBook