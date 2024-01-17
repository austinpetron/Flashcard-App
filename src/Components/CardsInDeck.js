import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

function CardsInDeck({ deck }) {
  const { deckId } = useParams();

  const { cards } = deck;

  if (!cards) {
    return <div>{JSON.stringify(deck)}</div>;
  }

  return cards.map((card) => (
    <div className="card" key={card.id}>
      <div className="card-body">
        <div className="card-text row">
          <div className="col">{card.front}</div>
          <div className="col">{card.back}</div>
        </div>
        <div className="text-right">
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button type="button" className="btn btn-secondary btn-lg ">
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-lg ml-auto"
            onClick={() => {
              window.confirm(
                "Delete this card? You will not be able to recover it."
              ) && deleteCard(card.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));
}

export default CardsInDeck;
