import React, { useState, useEffect } from 'react';

import Spinner from './Spinner';
import { fetchBurgerComments, fetchBurgerDetails } from '../api';

import './burger.scss';

const BurgerDetails = ({ burgerId }) => {
    const [burgerDetails, setBurgerDetails] = useState({img:{}});
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
            <img className='burger-image'
                 src={burgerDetails.img.high}
                 alt={burgerDetails.name}/>
            <p className='lead pt-2'>{burgerDetails.description}</p>
            <hr className='my-4'/>
            <div className='form-group row'>
                <label className='col-sm-4 col-form-label'>Address: {burgerDetails.address}</label>
                <label className='col-sm-4 col-form-label'>Phone: {burgerDetails.phone}</label>
                <label className='col-sm-4 col-form-label'>Email: {burgerDetails.email}</label>
            </div>
        </div>
    );
};

const BurgerComments = ({ burgerId }) => {
    const [burgerComments, setBurgerComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            <BurgerDetails burgerId={burgerId} />
            <BurgerComments burgerId={burgerId} />
        </div>
    );
};

export default Burger;
