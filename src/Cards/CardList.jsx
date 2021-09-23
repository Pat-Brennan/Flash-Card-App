import React, { useState } from 'react';
import CardView from './CardView';

export const CardList = ({ deck }) => {
    
    const [cards, setCards] = useState(deck.cards);
    const list = cards.map((card) => <CardView key={card.id} card={card} />)
    
    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
};

export default CardList;