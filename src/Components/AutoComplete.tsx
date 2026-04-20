import React from 'react';
// import DebounceFn from '../Utils/debounce';

const AutoComplete = () => {

    // const debouncedInput = new DebounceFn();

    console.log('here',debouncedInput)

    //https://dummyjson.com/products/search?q=phone 

    return (<div>

        auto complete
        <br/>

        <input  placeholder="type here" onChane={e} />
    </div>)
}

export default AutoComplete;