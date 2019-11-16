import React, { useState, useEffect } from 'react';

import Spinner from './Spinner';
import { fetchBurgersCompleteList } from '../api';

import './list.scss';

const getResultsFast = (burgersList, searchTerm) => {
    return burgersList.filter(burger =>
        burger.name.toLowerCase().includes(searchTerm)
    );
};

const getResultsSlow = (burgersList, searchTerm) => {
    return burgersList.filter(burger => {
        for (let i = 0; i < 2000; i++) {
            burger.description
                .toLowerCase()
                .split('')
                .reverse()
                .join('')
                .toUpperCase()
                .split('')
                .reverse()
                .join('')
                .toLowerCase();
        }

        return burger.name.toLowerCase().includes(searchTerm)
    });
};

const List = () => {
    const [burgersList, setBurgersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchBurgersCompleteList()
            .then(setBurgersList)
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setSearchResults(getResultsFast(burgersList, searchTerm));
        // setSearchResults(getResultsSlow(burgersList, searchTerm));
    }, [burgersList, searchTerm]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="burgers-list">
            <div className="input-group mb-3 burgers-list__search">
                <input
                    type="text"
                    placeholder="Search"
                    className="form-control burgers-list__search-input"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>

            <div className="burgers-list__table">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                        {searchResults.map(burger => (
                            <tr>
                                <td>{burger.id}</td>
                                <td>{burger.name}</td>
                                <td>{burger.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
