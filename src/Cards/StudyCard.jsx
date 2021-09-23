import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import NotEnoughCards from './NotEnoughCards';

function StudyCard({ deck = [] }) {
    const history = useHistory();
    const cards = deck.cards
    const [card, setCard] = useState({ id: 0, flipped: false });
    
    console.log(deck, cards);
    if (deck.cards.length < 3) {
        return (
            <div>
                <NotEnoughCards deck={deck} />
            </div>
        );
    } else {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {card.id + 1} of {cards.length}</h5>
                    <p className="card-text">{card.flipped ? cards[card.id].back : cards[card.id].front}</p>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                            setCard({ ...card, flipped: !card.flipped })}>Flip</button>
                    {card.flipped ?
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                if (card.id + 1 === cards.length) {
                                    return window.confirm("do you want to restart?")
                                        ? history.go(0)
                                        : history.push("/");
                                }
                                setCard(
                                    { ...card, id: card.id + 1, flipped: false })
                            }}>Next</button> : ""}
                </div>
            </div>
        )
    }
}

    export default StudyCard;