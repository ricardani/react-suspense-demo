import React, { useState, useEffect } from 'react';

import Spinner from './Spinner';
import ErrorBoundary from './ErrorBoundary';
import { fetchBurgerComments, fetchBurgerDetails } from '../api';

import './burger.scss';

const BurgerDetails = ({ burgerId }) => {
    const [burgerDetails, setBurgerDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchBurgerDetails(burgerId)
            .then(setBurgerDetails)
            .finally(() => setIsLoading(false));
    }, [burgerId]);

    if (isLoading) {
        return <Spinner />;
    }

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
            <img className='burger-image'
                 src={burgerDetails.img.high}
                 alt={burgerDetails.name}/>
            }
            <hr className='my-4'/>
        </div>
    );
};

const BurgerComments = ({ burgerId }) => {
    const [burgerComments, setBurgerComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    throw 'Random error';

    useEffect(() => {
        setIsLoading(true);
        fetchBurgerComments(burgerId)
            .then(setBurgerComments)
            .finally(() => setIsLoading(false));
    }, [burgerId]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='burger-comments row bg-dark'>
            {burgerComments.map(comment => (
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
        <div className='burger'>
            <ErrorBoundary>
                <BurgerDetails burgerId={burgerId} />
                <ErrorBoundary>
                    <BurgerComments burgerId={burgerId} />
                </ErrorBoundary>
            </ErrorBoundary>
        </div>
    );
};

export default Burger;
