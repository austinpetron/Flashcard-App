import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index"


function Home(){
  
 const [ decks, setDecks ] = useState([]); //creating state of decks.
  
  useEffect(() => { //useEffect used for getting decks.
    async function fetchDecks() {
    const response = await listDecks();
   
     setDecks(response);
  }
    fetchDecks();
 }, [decks.length]);//Revisit this.
  
 async function handleDelete(deckid){ //handles if delete button is clicked. 
   if (
   window.confirm(`Delete this deck? You will not be able to recover it`)
   ) {
     await deleteDeck(deckid)
     window.location.reload(false)
   }
 };
  
    return (
        <div className="container">
            <Link className="btn btn-secondary mb-2" to="/decks/new">
                Create Deck
            </Link>
            
            <div className="card-deck">
                  {decks.map((deck, index) => (<div className="card" style={{ width: "30rem" }} key={index}>
                    <div className="card-body">
                        <div className="card-title">
                            {deck.name}
                        </div>
                        <div className="card-subtitle mb-2 text-muted">
                            {deck.cards.length} cards
                        </div>
                        <div className="card-text">{deck.description}
                        </div>
                        <Link className="btn btn-secondary mx-1" to={`/decks/${deck.id}`}>
                         View
                        </Link>
                        <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`}>
                         Study
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger mx-1"
                            onClick={() => handleDelete(deck.id)}
                        >
                         Delete
                        </button>
                    </div>
                </div>
                  ))}  
            </div>
         </div>
       
    )
};

export default Home;