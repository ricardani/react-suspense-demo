import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';
import { fetchBurgerList } from '../api';

import './home-page.scss';

const BurgerList = ({burgerList}) => {
    return (
        <>
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
        </>
    );
};

const HomePage = () => {
    const [burgerList, setBurgerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchBurgerList()
            .then(setBurgerList)
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading || !burgerList.length) {
        return <Spinner />
    }

    return (
        <div className='burger-list row'>
            <BurgerList burgerList={burgerList} />
        </div>
    );
};

export default HomePage;
