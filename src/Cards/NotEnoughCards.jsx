import React from 'react';
import { Link } from 'react-router-dom';


function NotEnoughCards({deck}) {
    return (
        <div>
            <h3>Not enough cards.</h3>
            <h4>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</h4>
            <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary">
                Add Cards
            </button>
            </Link>
        </div>
    )
}

export default NotEnoughCards;