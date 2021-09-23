import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../utils/api';
import CardList from '../Cards/CardList';

export const DeckView = () => {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
    const abortController = new AbortController();
        async function getDeck() {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        getDeck();
    }, [deckId])

    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this deck?\n\nYou will not be able to recover it');
        if (result) {
            await deleteDeck(deckId, abortController.signal);
            history.push('/');
        }
    };

    if (!deck.id) {
        return "Loading..."
    } else {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li classname="breadcrumb-item">
                        <Link to='/'>
                            <span className='oi oi-home mr-2'></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page"> /{deck.name}</li>
                </ol>
            </nav>
            <div className="card">
                <div className="card-body">
                    <div className='row'>
                        <h5 className="card-title">{deck.name}</h5>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <div>
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button className='btn btn-secondary'>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className='btn btn-primary'>
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <button className='btn btn-primary'>
                                Add Cards
                            </button>
                        </Link>
                            <button className='btn btn-danger' onClick={handleDelete}>
                                Delete
                            </button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Cards</h2>             
                <CardList deck={deck}/>
            </div>
            </>
        );
    }
};

export default DeckView;