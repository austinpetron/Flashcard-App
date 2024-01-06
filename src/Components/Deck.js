import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
   const { deckId } = useParams();
   const history = useHistory();
   const [deck, setDeck] = useState(null);
   
   useEffect(() => {
    const fetchDeck = async () => {
        try {
          const response = await readDeck(deckId);
          setDeck(response);
        } catch (error) {
          console.error("Error loading deck:", error);
        }
      };

    fetchDeck();
 }, [deckId]);

  const handleDeleteDeck = async () => {
    const deleteConfirmed = window.confirm("Are you sure you want to delete this deck?");
    if (deleteConfirmed) {
      try {  
        await deleteDeck(deck.id);
       
        //After deletion, go to home screen.
        history.push("/");
      
      } catch (error) {
        console.error("Error deleting deck:", error);
      }  
    }
  };

  const handleDeleteCard = async (cardId) => {
    const deleteConfirmed = window.confirm("Delete this card? You will not be able to recover it");
    if (deleteConfirmed) {
        await deleteCard(cardId);

        //After deleted card, refresh to reflect the change
        const updateDeck = await readDeck(deckId);
        setDeck(updateDeck);
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

    return (
         <div>
             {/*Breadcrumb navigation*/}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>

            {/*Deck information*/}

            <h3>{deck.name}</h3>
            <p>{deck.description}</p>

            {/*Action buttons*/}
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
            &nbsp; &nbsp;
            <Link to={`/decks/${deckId}/study}`} className="btn btn-primary">Study</Link>
            &nbsp; &nbsp;
            <Link to={`/decks/${deckId}/cards/new`}  className="btn btn-primary">Add Cards</Link>
            &nbsp; &nbsp;
            <button className="btn btn-danger" onClick={handleDeleteDeck}>Delete</button>

            {/* Cards */}
            <h2>Cards</h2>
            {deck.cards.map((card) => (
                <div key={card.id} className="card">
                    <div className="card-body">
                    <p className="card-text">{card.front}</p>
                    <p className="card-text">{card.back}</p>
                    <Link to={`/decks/${deckId}/card/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                    &nbsp; &nbsp;
                    <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                    </div>
                </div>

            ))}

        </div>    
    );
}
export default Deck;