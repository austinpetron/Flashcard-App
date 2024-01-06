import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck";
import Study from "../Components/Study";
import EditDeck from "../Components/EditDeck";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";
import { Switch, Route } from "react-router-dom"

function Layout() {


  return (
    
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
       <Switch>
          <Route exact path="/">
            <Home />
           </Route> 
           <Route exact path={"/decks/:deckId/study"}>
            <Study />
           </Route>
           <Route exact path={"/decks/new"}>
            <CreateDeck />
           </Route>
           <Route exact path={"/decks/:deckId"}>
            <Deck />
            </Route>
           <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck /> 
           </Route>
           <Route exact path={"/decks/:decksId/cards/new"}>
            <AddCard />
            </Route>
            <Route exact path={"/decks/:decksId/cards/:cardId/edit"}>
              <EditCard />
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