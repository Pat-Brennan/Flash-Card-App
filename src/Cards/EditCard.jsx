import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

export const EditCard = () => {
    const { cardId, deckId } = useParams();

    const history = useHistory();

    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);
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
  
    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck(){
            const card = await readCard(cardId, abortController.signal);
            setCard(card);
            setFormData({
                front: card.front,
                back: card.back,
            });
        }
        getDeck();
    }, [cardId])

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        card.front = formData.front;
        card.back = formData.back;

            const abortController = new AbortController();
        
            async function updatedCard(){
                await updateCard(card, abortController.signal);
                setCard(card);
            }
            updatedCard();
            history.push(`/decks/${deckId}`);
        
    };

    if (!card && !deck && formData.back === undefined) {
        return 'Loading...';
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>
                                <span className='oi oi-home mr-2'></span>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                Deck {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav>
                <h2>Edit Card</h2>
                <form>
                    <div className="form-group">
                        <label for="front">Front</label>
                        <textarea 
                            class="form-control" 
                            id="front" 
                            name='front'
                            rows="3" 
                            onChange={handleChange}
                            value={formData.front}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label for="back">Back</label>
                        <textarea 
                            class="form-control" 
                            id="back" 
                            name='back'
                            rows="3" 
                            onChange={handleChange}
                            value={formData.back}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default EditCard;