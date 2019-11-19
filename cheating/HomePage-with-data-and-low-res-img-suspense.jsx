import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';
import { createResource, fetchBurgerList } from '../api';

import './home-page.scss';

const BurgerListResource = createResource(fetchBurgerList);
const ImageResource = createResource(
    source => new Promise(
        resolve => {
            const img = new Image();
            img.src = source;
            img.onload = resolve;
        }
    )
);

const Img = props => {
    ImageResource.read(props.src);
    return (
        <img
            {...props}
            alt={props.alt}
        />
    );
};

const BurgerList = () => {
    return (
        <>
            {BurgerListResource.read().map(burger => (
                <div key={burger.id} className='card pt-3 pb-3 col-3'>
                    <h3 className='card-header'>{burger.name}</h3>
                    <div className='card-body'>
                        <h6 className='card-subtitle text-muted'>{burger.rating}</h6>
                    </div>
                    <React.Suspense fallback={<img className='burger-image'
                                                   src={burger.img.low}
                                                   alt={burger.name} />}>
                        <Img className='burger-image'
                             src={burger.img.high}
                             alt={burger.name}/>
                    </React.Suspense>
                    <Link className='card-footer text-muted mt-2' to={`/burger/${burger.id}`}>
                        See More
                    </Link>
                </div>
            ))}
        </>
    )
};

const HomePage = () => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='burger-list row'>
                <BurgerList/>
            </div>
        </React.Suspense>
    );
};

export default HomePage;
