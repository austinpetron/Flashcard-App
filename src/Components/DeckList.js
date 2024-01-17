import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

function DeckList({ deck, index }) {
  const history = useHistory();

  return (
    <div className="card" key={index}>
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <h2>{deck.name}</h2>
          <h6>{deck.cards.length} cards</h6>
        </div>
        <div className="card-text">
          <p>{deck.description}</p>
        </div>
        <div className="d-flex flex-row">
          <Link to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary">
              View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary">
              Study
            </button>
          </Link>
          <button
            type="button"
            className="ml-auto p-2 btn btn-danger"
            onClick={() => {
              window.confirm(
                "Delete this deck? You will not be able to recover it."
              ) && deleteDeck(deck.id).then(history.go(0));
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckList;