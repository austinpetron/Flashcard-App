import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

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

  const handleFlip = () => {
    setIsFront((prevIsFront) => !prevIsFront);
  };

  const handleNext = () => {
    if (deck && deck.cards && currentCardIndex + 1 < deck.cards.length) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFront(true);
    } else {
      // End of deck, show restart prompt or return to home
      const restart = window.confirm("Restart the deck?");
      if (restart) {
        setCurrentCardIndex(0);
        setIsFront(true);
      } else {
        history.push("/");
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
          {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
        <h2>Not enough cards</h2>
        <p>{`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {/* Deck title */}
      <h2>Study: {deck.name}</h2>

      {/* Card display */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{isFront ? currentCard.front : currentCard.back}</p>
          <button className="btn btn-secondary" onClick={handleFlip}>
            Flip
          </button>
          {!isFront && (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;