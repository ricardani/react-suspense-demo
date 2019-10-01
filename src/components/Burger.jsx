import React, { useState, useEffect } from 'react';

import Spinner from './Spinner';
import { fetchBurgerComments, fetchBurgerDetails } from '../api';

import './burger.scss';

const BurgerDetails = ({ burgerId }) => {
    const [burgerDetail, setBurgerDetail] = useState({img: {}});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchBurgerDetails(burgerId)
            .then(setBurgerDetail)
            .finally(() => setIsLoading(false));
    }, [burgerId]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='burger-details jumbotron mb-0'>
            <h1 className='display-3'>{burgerDetail.name}</h1>
            <p>{burgerDetail.rating}</p>
            <img className='burger-image'
                 src={burgerDetail.img.high}
                 alt={burgerDetail.name}/>
            <p className='lead pt-2'>{burgerDetail.description}</p>
            <hr className='my-4'/>
            <div className='form-group row'>
                <label className='col-sm-4 col-form-label'>Address: {burgerDetail.address}</label>
                <label className='col-sm-4 col-form-label'>Phone: {burgerDetail.phone}</label>
                <label className='col-sm-4 col-form-label'>Email: {burgerDetail.email}</label>
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
