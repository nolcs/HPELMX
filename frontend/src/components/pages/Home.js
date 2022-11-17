import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import Rows from "../rows/Rows";

import "../../App.css";

const Home = () => {

  const location = useLocation();
  const inputname = location.state.name;
  const addExpenseHandler = (flightinfo) => {
    console.log("ALRIGHT");
  };

  return (
    <div className="App">
      <h2>Welcome to the questionary {inputname}</h2>
      <Rows onAddExpense={addExpenseHandler} />
    </div>
  );
};

export default Home;