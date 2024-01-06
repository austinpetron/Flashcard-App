import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  
  const [deck, setDeck] = useState({
    name: "",
    description: "",
  });

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const updatedDeck = {
      id: deck.id,
      name,
      description,
    };

    try {
      await updateDeck(updatedDeck);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const handleCancel = () => {
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
          <li className="breadcrumb-item" aria-current="page">
            {deck.name}
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="deckName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder={deck.name}
            value={deck.name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder={deck.description}
            id="deckDescription"
            value={deck.description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        &nbsp; &nbsp;
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;