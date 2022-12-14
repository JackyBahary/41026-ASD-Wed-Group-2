import NavBar from "./components/NavBar";
import LinkCard from "./pages/LinkCard";
import TopUp from "./pages/TopUp";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import RecordTrip from "./pages/RecordTrip";
import YourAccount from "./pages/YourAccount";
import LostStolenCard from "./pages/LostStolenCard";
import TripHistory from "./pages/TripHistory";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useContext, createContext } from "react";
import ProtectRoute from "./components/ProtectedRoute"
import SaveTrip from "./pages/SaveTrip";
import SavedTrip from "./pages/SavedTrip";
import AdminLostStolen from "./pages/Admin-lost-stolen";
import AdminDeactivate from "./pages/Admin-deactivate";
import AutomaticTopUp from "./pages/AutomaticTopUp";

const AuthContext = createContext();
const AdminContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function useAdmin() {
  return useContext(AdminContext);
}

const ProtectedLinkCard = ProtectRoute(LinkCard);
const ProtectedHome = ProtectRoute(Home);
const ProtectedRecordTrip = ProtectRoute(RecordTrip);
const ProtectedYourAccount = ProtectRoute(YourAccount);
const ProtectedTopUp = ProtectRoute(TopUp);
const ProtectedLostStolenCard = ProtectRoute(LostStolenCard);
const ProtectedTripHistory = ProtectRoute(TripHistory);
const ProtectedAdminLostStolen = ProtectRoute(AdminLostStolen);
const ProtectedAdminDeactivate = ProtectRoute(AdminDeactivate);
const ProtectedSaveTrip = ProtectRoute(SaveTrip);
const ProtectedSavedTrip = ProtectRoute(SavedTrip);
const ProtectedAutomaticTopUp = ProtectRoute(AutomaticTopUp);

function App() {
  const [auth, setAuth] = useState();
  const [admin, setAdmin] = useState();
  
  async function Login(email, password) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setAuth(email);
    }
    return authenticated;
  }

  async function AdminLogin(email, password) {
    const response = await fetch('http://localhost:8000/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { authenticated } = await response.json();
    if (authenticated) {
      setAuth(email);
      setAdmin(true);
    }
    return authenticated;
  }

  async function Register(email, password) {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function addCard(cardNum, cardName, user) {
    const response = await fetch('http://localhost:8000/api/addCard', {
      method: 'POST',
      body: JSON.stringify({ cardNum, cardName, user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function DeleteAccount(user) {
    const response = await fetch('http://localhost:8000/api/delete-accounts', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function DeleteUserCards(user) {
    const response = await fetch('http://localhost:8000/api/delete-user-cards', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function Password(user) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/password', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.passwords; //return the cards records from the response.json from server
  }

  async function Cards(user) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/cards', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.cards; //return the cards records from the response.json from server
  }

  async function Balance(card) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/card-balance', {
      method: 'POST',
      body: JSON.stringify({ card }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.balances; //return the card balances records from the response.json from server
  }

  async function AllCards() {
    const response = await fetch('http://localhost:8000/api/allcards', {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.allcards;
  }

  async function LostStolenCard(card) {
    const response = await fetch('http://localhost:8000/api/loststolencard', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.successs;
  }

  async function Stations() {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/stations');
    const data = await response.json();
    return data.stations; //return the stations rows from the response.json from server
  }

  async function RecordTrip(card, fromStation, toStation, price) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/record-trip', {
      method: 'POST',
      body: JSON.stringify({card, fromStation, toStation, price }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success; //return the success value from the response.json from server
  }
  
  async function GetPrice(fromStation, toStation) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/get-price', {
      method: 'POST',
      body: JSON.stringify({fromStation, toStation}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.price; //return the price value from the response.json from server
  }

  async function TripHistory(card) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/trip-history', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.trips; //return the trips records from the response.json from server
  }

  async function UpdatePassword(user, password) {
    const response = await fetch('http://localhost:8000/api/update-password', {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function Deactivate(card) {
    const response = await fetch('http://localhost:8000/api/deactivate-card', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.success;
  }

  async function SaveTrip(card, fromStation, toStation) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/save-trip', {
      method: 'POST',
      body: JSON.stringify({card, fromStation, toStation}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.success; //pulls the success value from the response.json from server
  }

  async function AutomaticTopUp(card, amount) {
    const response = await fetch('http://localhost:8000/api/automatic-top-up', {
      method: 'POST',
      body: JSON.stringify({card, amount}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.success;
  }
  
  async function TopUp(card, amount) {
    const response = await fetch('http://localhost:8000/api/top-up', {
      method: 'POST',
      body: JSON.stringify({card, amount}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.success;
  }

  async function DisableTopUp(card) {
    const response = await fetch('http://localhost:8000/api/disable-top-up', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.success;
  }

  async function SavedTrip(card) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/saved-trip', {
      method: 'POST',
      body: JSON.stringify({card}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.saved; //pulls the saved trip data from the response.json from server
  }

  async function DeleteSavedTrip(ids) {
    //get response from server in res.json
    const response = await fetch('http://localhost:8000/api/saved-trip', {
      method: 'DELETE',
      body: JSON.stringify({ids}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    return data.success; //pulls the success value from the response.json from server
  }

  return (
    <AuthContext.Provider value={auth}>
      <AdminContext.Provider value={admin}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path = '/' element = {
              <LoginRegister Login={Login} AdminLogin={AdminLogin} Register={Register} />
            } />
            <Route path = '/add-card' element = {
              <ProtectedLinkCard addCard={addCard}/>
            } />
            <Route path = '/home' element = {<ProtectedHome/>} />
            <Route path = '/record-trip' element = {
              <ProtectedRecordTrip Password={Password} Cards={Cards} Balance={Balance} Stations={Stations} RecordTrip={RecordTrip} GetPrice={GetPrice} />
            } />
            <Route path = '/your-account' element = {
              <ProtectedYourAccount UpdatePassword={UpdatePassword} DeleteAccount={DeleteAccount} DeleteUserCards={DeleteUserCards}/>
            } />
            <Route path = '/topup' element = {
              <ProtectedTopUp Cards={Cards} TopUp={TopUp}/>
            } />
            <Route path = '/automatic-top-up' element = {
              <ProtectedAutomaticTopUp Cards={Cards} AutomaticTopUp={AutomaticTopUp} DisableTopUp={DisableTopUp}/>
            } />
            <Route path = '/lost-stolen-card' element = {
              <ProtectedLostStolenCard LostStolenCard={LostStolenCard} Cards={Cards} />
            } />
            <Route path = '/trip-history' element = {
              <ProtectedTripHistory Cards={Cards} TripHistory={TripHistory}/>
            }/>
            <Route path = '/admin-lost-stolen' element = {
              <ProtectedAdminLostStolen AllCards={AllCards} LostStolen={LostStolenCard}/>
            }/>
            <Route path = '/deactivate-card' element = {
              <ProtectedAdminDeactivate AllCards={AllCards} Deactivate={Deactivate}/>
            }/>
            <Route path = '/save-trip' element = {
              <ProtectedSaveTrip Cards={Cards} Stations={Stations} SaveTrip={SaveTrip} /> 
            } />
            <Route path = '/saved-trip' element = {
              <ProtectedSavedTrip Cards={Cards} SavedTrip={SavedTrip} DeleteSavedTrip={DeleteSavedTrip}/> 
            } />
          </Routes>
        </BrowserRouter>
      </AdminContext.Provider>
    </AuthContext.Provider>
    
  );
}

export { useAuth };
export { useAdmin };
export default App;