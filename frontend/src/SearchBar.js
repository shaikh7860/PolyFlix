import React, {useState} from 'react';

function SearchBar(props) {

    const [searchInput, setSearchInput] = useState('');

    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    function submitSearch(){
        props.handleSubmit(searchInput);
        setSearchInput('');
    }

    return (
        <box>
            <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />
            
            <input type="button" value="Search" onClick={submitSearch} />
        </box>
          
    )
}

export default SearchBar