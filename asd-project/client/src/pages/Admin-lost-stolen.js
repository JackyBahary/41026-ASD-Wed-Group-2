import { useState, useEffect } from "react";
import Button from "../components/Button"
import { useAuth } from "../App"

//importing necessary functions

function AdminLostStolen({AllCards, LostStolen}) {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [fontSize, setFontSize] = useState("text-2xl");
  //triggers db card retrieval 
  useEffect(() => {
    HandleCards()
  }, [])

//pulls all cards from the database and loads them to cards state

  async function HandleCards() {
    const cards = await AllCards();
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

  function toggleTextSize(){
      if (fontSize == "text-2xl"){
        setFontSize("text-4xl")
      } else (
        setFontSize("text-2xl")
      )
  }

//Queries db to add lost/stolen flag to each card

  async function HandleLostStolen() {
    const success = await LostStolen(card);
    if (success) {
      setErrorMessage("Card " + card + " Marked Lost/Stolen");
    }
    else {
      //shows error message if change is unsuccessful
      setErrorMessage("Error");
    }
  }
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
        Lost/Stolen Cards
      </p>
      <Button onClick={toggleTextSize}> Accessibility (Size) </Button>
        {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
        )}
        <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6 py-2">  
          <label className={`text-white ${fontSize} p-8 w-100`}>Cards</label>
          <select className={`rounded-l ${fontSize} w-max`}
          value={card} 
          //sets the card object to the current value of the list
          onChange={e => setCard(parseInt(e.target.value))}
          >
            {
              cards.map((card) => {
                return (
                  //displays list of cards
                  <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-full">
          <Button

          //sends the current card number to the lost/stolen function, to be handled and sent off
          type='button' 
          onClick={HandleLostStolen}>Lost Stolen</Button>
        </div>
    </div>
  );
}
  
export default AdminLostStolen;