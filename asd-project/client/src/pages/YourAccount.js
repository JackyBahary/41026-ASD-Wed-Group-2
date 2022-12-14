import { useAuth } from "../App"
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"
import LostStolenCard from "./LostStolenCard";
import {Link} from 'react-router-dom';

function YourAccount({UpdatePassword, DeleteAccount, DeleteUserCards}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setSuccessMessage] = useState("");
  const user = useAuth();

  //updates the users account password 
  async function HandlePassword() {
    const success = await UpdatePassword(user, password);
    if (success) {
      setSuccessMessage("Your password has been updated!");
    }
    else {
      setSuccessMessage("Failed to Update Password.");
    }
  }

    async function HandleTopUpSuccess() {
      setSuccessMessage("Your card balance has been added!");
    }

  //deletes user account and the cards the users has linked to account -- known issue -- trip history isnt removed if card num is same later.
  async function HandleDeleteAccount() {
    navigate('/home');
    const deleteCards = await DeleteUserCards(user);
    const success = await DeleteAccount(user);
    if (!success) {
      errorMessage("Error. Unable to delete account.");
    }
  }

  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-2">
        {user}'s Account
      </p>
      
      {errorMessage && (
      <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
    )}
      <div className=" justify-self-center w-full grid-cols-2 py-8">
        <label className="text-white text-2xl p-8 w-100">New Password</label>
        <input className="rounded-l text-2xl w-max"
          type='password' 
          onfocus="this.value=''" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="w-full">    
      <Button
        type='button' 
        //calls handlepassword once the change password button has been selected
        onClick={HandlePassword}> Change Your Password</Button>
      </div>

      <div className="w-full">    
      <Button
        type='button'
        onClick={HandleDeleteAccount}> Delete Account</Button>
      </div>

      <div className="w-full mt-6"> 
        <Link to='/lost-stolen-card'>
          <Button>
            Report a Lost/Stolen Card
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default YourAccount;