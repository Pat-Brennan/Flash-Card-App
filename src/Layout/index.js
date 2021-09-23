import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Decks/DeckList";
import { listDecks } from "../utils/api";
import DeckForm from "../Decks/DeckForm";
import StudyDeck from "../Decks/StudyDeck";
import DeckView from "../Decks/DeckView";
import EditCard from "../Cards/EditCard";
import AddCard from "../Cards/AddCard";
import EditDeck from "../Decks/EditDeck";

function Layout() {
  const [decks, setDecks] = useState([])
  useEffect(() => {
    function deckAPI() {
      listDecks()
        .then((res) => {
          setDecks(res);
        })
        .catch((err) => {
          console.log(err)
        });
    }
    deckAPI();
  }, []);
  console.log(decks);
  
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} setDecks={setDecks}/>
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route path="/decks/new">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck decks={decks} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route>
        <NotFound />
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default Layout;
