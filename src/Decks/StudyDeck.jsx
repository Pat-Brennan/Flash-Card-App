import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import StudyCard from "../Cards/StudyCard";
import { readDeck } from "../utils/api"

function StudyDeck({decks}) {
    const params = useParams()
    const deckId = Number(params.deckId)
    const [deck, setDeck] = useState({})

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck)
    }, []);

    console.log(deck)
    
    if (!deck.id) {
        return <p>wait</p>
    }

    return (
        <div>
        <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Study</li>
    </ol>
            </nav>
            <h2> Study: {deck.name} </h2>
            <StudyCard deck={deck} />
        </div>
    )
}

export default StudyDeck;
