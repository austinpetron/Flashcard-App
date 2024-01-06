import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const fetchDeckAndCard = async () => {
      try {
        const deckResponse = await readDeck(deckId);
        const cardResponse = await readCard(cardId);
        setDeck(deckResponse);
        setCard(cardResponse);
        setFront(cardResponse.front);
        setBack(cardResponse.back);
      } catch (error) {
        console.error("Error loading deck or card:", error);
      }
    };

    fetchDeckAndCard();
  }, [deckId, cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCard = {
      id: card.id,
      front,
      back,
    };

    try {
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck || !card) {
    return <p>Loading...</p>;
  }

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
            {`Edit Card ${cardId}`}
          </li>
        </ol>
      </nav>

      {/* Deck title */}
      <h2>{`Edit Card ${cardId}`}</h2>

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
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCard;