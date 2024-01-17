import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardsInDeck from "../Components/CardsInDeck";
import { readDeck, deleteDeck } from "../utils/api/index.js";

export default function Deck() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({
    id: "",
    name: "",
    description: "",
    cards: [],
  });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, []);

  function Breadcrumb() {
    return (
      <nav aria-label="breadcrumb" style={{ padding: "5px 10px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
    );
  }

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      <div className="container">
        <div className="row">
          <h3>{deck.name}</h3>
        </div>
        <p>{deck.description}</p>
        <div className="row d-flex">
          <Link to={`/decks/${deck.id}/edit`}>
            <button type="button" className="btn btn-primary btn-lg">
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary btn-lg">
              Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary btn-lg">
              Add Cards
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-lg ml-auto"
            onClick={() => {
              window.confirm(
                "Delete this deck? You will not be able to recover it."
              ) && deleteDeck(deckId);
            }}
          >
            Delete
          </button>
        </div>
        <div className="container">
          <h2>Cards</h2>
          <CardsInDeck deck={deck} setDeck={setDeck} />
        </div>
      </div>
    </>
  );
}