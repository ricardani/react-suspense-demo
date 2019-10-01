import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';
import { fetchBurgerList } from '../api';
import { unstable_createResource } from '../cache';

import './home-page.scss';

const BurgerListResource = unstable_createResource(fetchBurgerList);
const ImageResource = unstable_createResource(
    source => new Promise(
        resolve => {
            const img = new Image();
            img.src = source;
            img.onload = () => resolve(source);
        }
    )
);

const Img = props => {
    const imgSource = ImageResource.read(props.src);
    return (
        <img
            {...props}
            src={imgSource}
        />
    );
};

const HomePage = () => {
    const burgerList = BurgerListResource.read();

    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='burger-list row'>
                {burgerList.map(burger => (
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
            </div>
        </React.Suspense>
    );
};

export default HomePage;
