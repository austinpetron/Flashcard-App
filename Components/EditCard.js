import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm"

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
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

  const handleChange = ({ target }) => {
    const value = target.value;
    setCard({
      ...card,
      [target.name]: value,
    });
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
      <CardForm deck={deck}
          card={card}
          handleChange={handleChange}
          handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditCard;