import React, { useState } from 'react';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/employees/search', {
                method: "POST",
                body: JSON.stringify({ firstName: searchTerm }), // Sending firstName as searchTerm
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            props.setData(data);
            console.log(data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search Employee"
                aria-label="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
};

export default Search;
