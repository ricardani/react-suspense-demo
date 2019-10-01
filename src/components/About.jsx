import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className='jumbotron'>
            <h1 className='display-3'>About us!</h1>
            <p className='lead'>
                Epic cheeseburgers come in all kinds of manifestations, but we want them in and around our mouth no matter what. Slide those smashed patties with the gently caramelized meat fat between a toasted brioche bun and pass it over. You fall in love with the cheeseburger itself but the journey ain’t half bad either.
                They’re the childhood friend that knows your highest highs and lowest lows. They’ve been with you through thick and thin and they’re the best at keeping secrets. Whether it’s dressed up or informal, cheeseburgers have your back.
            </p>
            <hr className='my-4' />
            <p>
                Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all forms - bun intended.
                Pop quiz: what’s the greatest thing to happen to your mind, body, and soul in recent history? A cheeseburger, obviously. Cheeseburgers know that what you want can also be what you need.
            </p>
            <p className='lead'>
                <Link className='btn btn-primary btn-lg' to='/' role='button'>Go Back</Link>
            </p>
        </div>
    );
};

export default About;
