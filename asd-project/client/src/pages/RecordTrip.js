import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import { useAuth } from "../App"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';

function RecordTrip({ Password, Cards, Balance, Stations, RecordTrip, GetPrice}) {
  //Create states and variables to use in component
  const navigate = useNavigate(); //Create navigate component to navigate through pages
  const user = useAuth(); //Create variable storing user data from Context
  const [cards, setCards] = useState([]);
  const [balance, setBalance] = useState();
  const [stations, setStations] = useState([]);
  const [card, setCard] = useState();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //This is to call functions as page loads
  useEffect(() => {
    HandleCards()
    HandleStations()
  }, [])

  useEffect(() => {
    HandlePrice()
    HandleBalance()
  }, )

  useEffect(() => {
    HandlePassword()
  }, "")

  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
    if (userPassword == password && password != "") {
      HandleRecord();
      setErrorMessage("Successfully Recorded")
      HandleBalance();
    }
    else {
      setErrorMessage("Wrong Password");
    }
  };

  //Handle function to get user's password from DB
  async function HandlePassword() {
    const passwords = await Password(user);
    setUserPassword(passwords[0].password);
  }

  //Handle function to get cards from DB
  async function HandleCards() {
    const cards = await Cards(user);
    setCards(cards);
    setCard(cards[0].cardnumber);
  }

   //Handle function to get balance from selected card from DB
   async function HandleBalance() {
    const balances = await Balance(card);
    console.log(card);
    setBalance(balances[0].balance);
  }

  //Handle function to get stations from DB
  async function HandleStations() {
    const stations = await Stations();
    setStations(stations);
    setFromStation(stations[0].stationname);
    setToStation(stations[0].stationname);
  }

  //Handle function to record or insert a record into the DB with parameters, card, fromStation, toStation and price
  async function HandleRecord() {
    const success = await RecordTrip(card, fromStation, toStation, price);
    if (!success) {
      setErrorMessage("Error");
    }
    else {
      setErrorMessage("Successfully Recorded")
      HandleBalance();
    }
  }

  //Handle function to get the price based on fromStation and toStation from the DB
  async function HandlePrice() {
    const price = await GetPrice(fromStation, toStation);
    setPrice(price);
  }

  //Return html content
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          Record Recent Trip 
      </p>
      {errorMessage && (
          <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
      )}
      <div className=" justify-self-center w-full grid-cols-2 pb-8 mt-6">
          <label className="text-white text-2xl p-8 w-100">Cards</label>
          {/* map select tag with every index in 'cards' state */}
          <select className="rounded-l text-2xl w-max" 
          value={card} 
          onChange={e => setCard(parseInt(e.target.value))}
          >
            {
              cards.map((card) => {
                return (
                  <option key = {card.cardnumber} value={card.cardnumber}>{card.cardnumber}</option>
                )
              })
            }
          </select>
          <label className="text-white text-2xl p-8 w-100">Balance: {balance}</label>
      </div>
      <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">From Station</label>
          {/* map select tag with every index in 'stations' state */}
          <select className="rounded-l text-2xl w-max"
          value={fromStation} 
          onChange={e => setFromStation(e.target.value)}
          >
            {
              stations.map((station) => {
                return (
                  <option value={station.stationname}>{station.stationname}</option>
                )
              })
            }
          </select>
      </div>
      <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">To Station</label>
          {/* map select tag with every index in 'stations' state */}
          <select className="rounded-l text-2xl w-max"
          value={toStation} 
          onChange={e => setToStation(e.target.value)}
          >
            {
              stations.map((station) => {
                return (
                  <option value={station.stationname}>{station.stationname}</option>
                )
              })
            }
          </select>
      </div>
      <div className=" justify-self-center w-full grid-cols-2 pb-8">
          <label className="text-white text-2xl p-8 w-100">Price</label>
          <label className="text-white text-2xl p-8 w-100">${price}</label> {/*display price from 'price' state*/}        
      </div>
      <div className="w-full">
          <Button
          type='button' 
          onClick={() => {
            handleClickToOpen();
          }}>Record</Button> {/*calls Handle function when button is clicked*/}
      </div>
      <Dialog open={open} onClose={handleToClose}>
        <DialogContent>
          <DialogContentText>
            Password Verifications
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={e => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Record
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RecordTrip;