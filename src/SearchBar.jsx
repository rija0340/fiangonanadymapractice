import { Fragment } from 'react';

export function SearchBar({searchHandle}){
    return(
        <Fragment>
            <input type="text"  onChange={searchHandle} className='form-control'   />
        </Fragment>
    );
}