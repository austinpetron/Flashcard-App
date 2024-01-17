import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

function NewDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) =>
    setDeckDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deck = await createDeck({
      name: deckName,
      description: deckDescription,
    });
    setDeckName("");
    setDeckDescription("");
    history.push(`/decks/${deck.id}`);
  };

  function Breadcrumb() {
    return (
      <nav aria-label="breadcrumb" style={{ padding: "5px 10px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item"> Create Deck</li>
        </ol>
      </nav>
    );
  }

  return (
    <>
      <Breadcrumb />

      <div className="container fluid">
        <h2>Create Deck</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            className="container fluid"
            type="text"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleNameChange}
            value={deckName}
          />
          <br></br>
          <label htmlFor="Description">Description</label>
          <br></br>
          <textarea
            className="container fluid"
            id="description"
            name="description"
            placeholder="Brief description of the deck"
            rows={4}
            onChange={handleDescriptionChange}
            value={deckDescription}
          />
          <div className="row">
            <Link to="/">
              <button type="button" className="btn btn-secondary btn-sm">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewDeck;
