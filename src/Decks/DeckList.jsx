import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckList({decks = [], setDecks}) {
    const history = useHistory();

    function handleDelete(id) {
        let result = window.confirm(
            "Delete this deck? \n \n You will not be able to recover it."
        );

        if (result) {
            const updatedDecks = decks.filter((deck) => deck.id !== id);
            deleteDeck(id);
            setDecks(updatedDecks);
        }
    }
    return (
        <div>
            <div className="actions">
                <Link to="/decks/new"> 
                    <button className="btn btn-secondary">
                    <span className="oi oi-plus">
                    Create Deck
                        </span>
                    </button> 
            </Link>
            </div>
            {decks.map((deck) => {
                return (
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                            <p className="card-text">{deck.description}</p>
                            
                            <Link to={`/decks/${deck.id}/study`}>
                            <button class="btn btn-primary"> Study </button>
                            </Link> 

                            <Link to={`/decks/${deck.id}`}>
                            <button class="btn btn-secondary"> View </button>
                            </Link>

                            <button class="btn btn-danger" onClick={(e) => {
                                e.preventDefault();
                                handleDelete(deck.id)
                            }}>
                            Delete
                            </button>
                        
                    </div>
                </div>
                )
            })}
        </div>
    );
}




export default DeckList;