import { useState, useEffect } from "react";
import Button from "../components/Button"
import { useAuth } from "../App"
import SaveTrip from "./SaveTrip";
import {Link} from 'react-router-dom';

function SavedTrip({Cards, SavedTrip}) {
  const user = useAuth();
  const [cards, setCards] = useState([]);
  const [saved, setSaved] = useState([]);
  const [card, setCard] = useState();
  const [clicked, setClicked] = useState();
  
  // Runs the function "HandleCards()".
  useEffect(() => {
    HandleCards()
  }, [])

  // Pulls cardnumber data from the database.
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  // Pulls saved trip data from SaveTrip when the button is clicked according to the given card number input.
  async function HandleSaved() {
    console.log(saved);
    const savedTrip = await SavedTrip(card);
    console.log(savedTrip);
    setSaved(savedTrip);
    setClicked(true);
  }

  // Line 45-59: A drag-down selector which allows the user to select their card number based on the data from the database.
  // Line 60-61: A button that allows user to click if they have selected their card number.
  // Line 65-88: Pulls the saved trip from SaveTrip database that the user has inputted. Their card number, from station and to station will be shown as an indicator.
  // Line 90-94: Automatically pops out a message telling the user if they have not made any saved trip from their card number input.
  // Line 95-100: A button that redirects user to save a new trip.
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
            Your Saved Trip
        </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
            <label className="text-white text-2xl p-8 w-100">Select Card</label>
            <select className="rounded-l text-2xl w-max" 
            value={card} 
            onChange={e => {setCard(parseInt(e.target.value))
            setClicked(false)}}
            >
              {
                cards.map((card) => {
                  return (
                    <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                  )
                })
              }
            </select>
            <Button type='button'
            onClick={HandleSaved}>View Saved Trip</Button>
        </div>
        <p className="text-white text-center text-2xl p-8 w-100">Saved Trips</p>
        {clicked && saved.length > 0 && (
          <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
          <table className="text-white text-2xl p-8 w-100 table-auto content-evenly">
            <thead>
              <tr>
                <th>Card Number</th>
                <th>From Station</th>
                <th>To Station</th>
              </tr>
            </thead>
            <tbody>
              {
                saved.map((saved) => {
                  return (
                    <tr>
                      <td key = {saved.cardnumber} value={saved.cardnumber}>{saved.cardnumber}</td>
                      <td key = {saved.fromstation} value={saved.fromstation}>{saved.fromstation}</td>
                      <td key = {saved.tostation} value={saved.tostation}>{saved.tostation}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        )}
        {
          clicked && saved.length == 0 && (
            <p className="text-white text-center text-2xl p-8 w-100"> You have not saved any trip in this card {card}</p>
          )
        }
        <div className="w-full mt-6">
        <Link to='/save-trip'>
          <Button>
            Save Trip
          </Button>
        </Link>
        

      </div>
    </div>
  );
}

export default SavedTrip;