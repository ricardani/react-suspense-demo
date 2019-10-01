import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchBurgerList } from '../api';

import './home-page.scss';

const HomePage = () => {
    const [burgerList, setBurgerList] = useState([]);

    useEffect(() => {
        fetchBurgerList().then(setBurgerList);
    }, []);

    return (
        <div className='burger-list row'>
            {burgerList.map(burger => (
                <div key={burger.id} className='card pt-3 pb-3 col-3'>
                    <h3 className='card-header'>{burger.name}</h3>
                    <div className='card-body'>
                        <h6 className='card-subtitle text-muted'>{burger.rating}</h6>
                    </div>
                    <img className='burger-image'
                         src={burger.img.high}
                         alt={burger.name}/>
                    <Link className='card-footer text-muted mt-2' to={`/burger/${burger.id}`}>
                        See More
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default HomePage;