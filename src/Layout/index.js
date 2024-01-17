//updated
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Header from "./Header";
import NotFound from "./NotFound";
import NewDeck from "../Components/NewDeck";
import EditDeck from "../Components/EditDeck";
import Deck from "../Components/Deck";
import Study from "../Components/Study";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/new">
            <NewDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
            <Route exact path="/decks/:deckId">
              <Deck />
            </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
