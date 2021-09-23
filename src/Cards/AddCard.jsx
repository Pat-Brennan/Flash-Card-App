import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';


export const AddCard = () => {
    const { deckId } = useParams();

    const history = useHistory();

    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({
        front: '',
        back: '',
    });
    const initalFormData = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });

    
    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck(){
            const deck = await readDeck(deckId, abortController.signal);
            setDeck(deck);
        }
        getDeck();
    }, [deckId])

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        card.front = formData.front;
        card.back = formData.back;
        const abortController = new AbortController();
        async function addCard(){
            await createCard(deckId, card, abortController.signal);
            setCard(card);
        }
        addCard();
        setFormData({ ...initalFormData });
    };

    if (!card && !deck && formData.back === undefined) {
        return 'Loading...';
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <Link to='/'>
                                <span className='oi oi-home mr-2'></span>
                                Home
                            </Link>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
                <h2>{deck.name}: Add Card</h2>
                <form>
                    <div class="form-group">
                        <label for="front">Front</label>
                        <textarea 
                            class="form-control" 
                            id="front" 
                            name='front'
                            rows="3" 
                            placeholder='Front side of card'
                            onChange={handleChange}
                            value={formData.front}
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="back">Back</label>
                        <textarea 
                            class="form-control" 
                            id="back" 
                            name='back'
                            rows="3" 
                            placeholder='back side of card'
                            onChange={handleChange}
                            value={formData.back}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleDone}>
                        Done
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default AddCard;