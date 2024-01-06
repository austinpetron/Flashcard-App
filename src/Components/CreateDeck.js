import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    const handleCancel = () => {
        //If user clicks cancel, go to Home screen.
        history.push("/");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //call the createDeck function to save new deck to database
            const newDeck = await createDeck({ name, description });
           
            const newDeckId = newDeck.id

           //Navigate to decks
            history.push(`/decks/${newDeckId}`);
        } catch (error) {
            console.error("Error creating deck:", error);
        }
    };
    
    return (
       
        <div>
            {/*Breadcrumb navigation*/}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
             
             {/*Form creating a new deck */}
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="deckName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="deckName" placeholder="Deck Name" value={name} onChange={(event) => setName(event.target.value)}/>
                    
                </div>
                <div class="mb-3">
                    <label htmlFor="deckDescription" class="form-label">Description</label>
                    <textarea type="text" class="form-control" placeholder="Brief description of the deck" id="deckDescription" value={description} onChange={(event) => setDescription(event.target.value)}/>
                </div>
                <button type="cancel" class="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                &nbsp; &nbsp;
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck
