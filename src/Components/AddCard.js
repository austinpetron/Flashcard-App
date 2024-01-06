import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCard = {
      front,
      back,
    };

    try {
      await createCard(deckId, newCard);
      // Clear form fields after successfully creating the card
      setFront("");
      setBack("");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };


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
            Add Card
          </li>
        </ol>
      </nav>

      {/* Deck title */}
      <h2>{`Add  Card: ${deck.name}`}</h2>

      {/* Card form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            placeholder="Enter front of the card"
            value={front}
            onChange={(event) => setFront(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            placeholder="Enter back of the card"
            value={back}
            onChange={(event) => setBack(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        &nbsp; &nbsp;
        <button type="button" className="btn btn-secondary" onClick={handleDone}>
          Done
        </button>
      </form>
    </div>
  );
}

export default AddCard;