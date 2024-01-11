import React from "react";
import { Link } from "react-router-dom";

function CardForm({ deck, card, handleChange, handleSubmit }) {

return (
    <form onSubmit={handleSubmit}>
          <label htmlFor="front" className="ml-1">
            <h4>Front</h4>
          </label>
          <br></br>
          <textarea
            className="container fluid mb-3"
            id="front"
            name="front"
            placeholder="Front side of card"
            rows={4}
            onChange={handleChange}
            value={card.front}
          />
          <label htmlFor="back" className="ml-1">
            <h4>Back</h4>
          </label>
          <textarea
            className="container fluid"
            id="back"
            name="back"
            placeholder="Back side of card"
            rows={4}
            onChange={handleChange}
            value={card.back}
          />

          <div className="row ml-1">
            <Link to={`/decks/${deck.id}`}>
              <button type="button" className="btn btn-secondary btn-lg">
                Done
              </button>
            </Link>
            <button type="submit" className="btn btn-primary btn-lg">
              Save
            </button>
          </div>
        </form>
)
};

export default CardForm;