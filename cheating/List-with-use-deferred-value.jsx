import React, { useState, useEffect, useDeferredValue } from 'react';

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
        const now = performance.now();
        while (performance.now() - now < 10) {
            // Note: this is an INTENTIONALLY EMPTY loop that
            // DOES NOTHING for 10 milliseconds for EACH ITEM.
            //
            // It's meant to emulate what happens in a deep
            // component tree with calculations and other
            // work performed inside components that can't
            // trivially be optimized or removed.
        }

        return burger.name.toLowerCase().includes(searchTerm)
    });
};

const BurgerListTable = ({ searchTerm, burgersList }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // setSearchResults(getResultsFast(burgersList, searchTerm));
        setSearchResults(getResultsSlow(burgersList, searchTerm));
    }, [burgersList, searchTerm]);

    return (
        <div className='burgers-list__table'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Description</th>
                </tr>
                </thead>
                <tbody>
                {searchResults.map(burger => (
                    <tr key={burger.id}>
                        <td key={`${burger.id}-id`}>{burger.id}</td>
                        <td key={`${burger.id}-name`}>{burger.name}</td>
                        <td key={`${burger.id}-description`}>{burger.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const List = () => {
    const [burgersList, setBurgersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm, { timeoutMs: 2000 });

    useEffect(() => {
        setIsLoading(true);
        fetchBurgersCompleteList()
            .then(setBurgersList)
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='burgers-list'>
            <div className='input-group mb-3 burgers-list__search'>
                <input
                    type='text'
                    placeholder='Search'
                    className='form-control burgers-list__search-input'
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <BurgerListTable searchTerm={deferredSearchTerm} burgersList={burgersList} />
        </div>
    );
};

export default List;
