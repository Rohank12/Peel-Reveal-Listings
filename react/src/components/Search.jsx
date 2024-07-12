import React, { useState } from 'react';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const handleSubmit = event => {
        event.preventDefault();
        fetch(`http://localhost:3000/search`, {
            method: "POST",
            body: JSON.stringify({ searchTerm }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                props.setData(data);
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };
        const results = employees.filter(employee =>
          employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;