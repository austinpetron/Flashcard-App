import React, { useEffect, useState } from "react";
import DeckList from "../Components/DeckList";
import { listDecks } from "../utils/api/index.js";

function DecksInSet() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  return (
    <div>
      {decks.map((deck, index) => (
        <DeckList deck={deck} index={index} />
      ))}
    </div>
  );
}

export default DecksInSet;