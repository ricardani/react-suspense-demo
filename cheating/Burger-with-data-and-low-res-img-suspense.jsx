import React from 'react';

import Spinner from './Spinner';
import { createResource, fetchBurgerComments, fetchBurgerDetails } from '../api';

import './burger.scss';

const BurgerCommentsResource = createResource(fetchBurgerComments);
const BurgerDetailsResource = createResource(fetchBurgerDetails);
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

const BurgerDetails = ({ burgerId }) => {
    const burgerDetails = BurgerDetailsResource.read(burgerId);

    return (
        <div className='burger-details jumbotron mb-0'>
            <h1 className='display-3'>{burgerDetails.name}</h1>
            <p>{burgerDetails.rating}</p>
            <p className='lead pt-2'>{burgerDetails.description}</p>
            <div className='form-group row'>
                <label className='col-sm-4 col-form-label'>Address: {burgerDetails.address}</label>
                <label className='col-sm-4 col-form-label'>Phone: {burgerDetails.phone}</label>
                <label className='col-sm-4 col-form-label'>Email: {burgerDetails.email}</label>
            </div>
            {burgerDetails.img &&
            <React.Suspense fallback={<img className='burger-image'
                                           src={burgerDetails.img.low}
                                           alt={burgerDetails.name} />}>
                <Img className='burger-image'
                     src={burgerDetails.img.high}
                     alt={burgerDetails.name}/>
            </React.Suspense>
            }
            <hr className='my-4'/>
        </div>
    );
};

const BurgerComments = ({ burgerId }) => {
    return (
        <div className='burger-comments row bg-dark'>
            {BurgerCommentsResource.read(burgerId).map(comment => (
                <blockquote key={comment.id} className='blockquote text-center col-3'>
                    <p className='mb-0'>{comment.message}</p>
                    <footer className='blockquote-footer'>{comment.author}</footer>
                </blockquote>
            ))}
        </div>
    );
};

const Burger = ({ match }) => {
    const burgerId = match.params.burgerId;

    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='burger'>
                <BurgerDetails burgerId={burgerId} />
                <React.Suspense fallback={<Spinner />}>
                    <BurgerComments burgerId={burgerId} />
                </React.Suspense>
            </div>
        </React.Suspense>
    );
};

export default Burger;
