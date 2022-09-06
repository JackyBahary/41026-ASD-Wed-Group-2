import { useAuth } from "../App"
import { useState, useContext, createContext } from "react";
import Button from "../components/Button"

function YourAccount() {
  const [password, setPassword] = useState("");
  const [errorMessage, setSuccessMessage] = useState("");
  const user = useAuth();

  async function HandleSuccess() {
      setSuccessMessage("Your password has been updated!");
    }

    return (
      
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          {user}'s Account
        </p>
        
        {errorMessage && (
        <div className="rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 b-2 text-white font-bold">{errorMessage}</div>
      )}
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
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
          onChange={e => setPassword(e.target.value)}
          onClick={HandleSuccess}> Change Password</Button>
          </div>
      </div>
    );
    }
    export default YourAccount;