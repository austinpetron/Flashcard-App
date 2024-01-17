//updated
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import CardForm from "../Components/CardForm.js";

function AddCard() {

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  if (!deck.id) return null;

  const handleChange = ({ target }) => {
    const value = target.value;
    setCard({
      ...card,
      [target.name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    createCard(deckId, card);
    history.go(`/decks/${deckId}/cards/new`);
  };

  function Breadcrumb() {
    return (
      <nav aria-label="breadcrumb" style={{ padding: "5px 10px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
    );
  }

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      <div>
        <h1 className="ml-1">{deck.name}: Add Card</h1>
        <CardForm
          deck={deck}
          card={card}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default AddCard;