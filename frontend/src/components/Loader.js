import React from 'react'
import { Spinner } from 'react-bootstrap'
import {BeatLoader} from 'react-spinners'
function Loader() {
    return (
        <div className='d-flex align-items-center justify-content-center m-5'>
  <BeatLoader color="#343a40" />
</div>

        
    )
}

export default Loader