import { React, useState } from "react";
import { useHistory,  Link } from "react-router-dom";
import {createDeck} from '../utils/api'


export default function DeckForm(){
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
   const deck = {name:name, description:desc}
   const history = useHistory()

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescChange = (event) => setDesc(event.target.value);
   
    const handleSubmit = (event) => {event.preventDefault();
        let result = createDeck(deck)
        console.log(result)
    setName('')
    setDesc('')
    }
    
  return (<form onSubmit={handleSubmit}>
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
  </ol>
</nav>
      <h2>Create Deck</h2>
    <label htmlFor="name">
      Name
      <input
        id="name"
        type="text"
        name="name"
        onChange={handleNameChange}
        value={name}
        placeholder="Deck Name"
      />
    </label>
    <label htmlFor="breed">
      Description
      <textarea
        id="desc"
        type="text"
        name="desc"
        onChange={handleDescChange}
        value={desc}
        placeholder="Brief description of the deck"
      />
    </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => history.push("/")}>Cancel</button>
  </form>)}