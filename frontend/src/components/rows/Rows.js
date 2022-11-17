import React, { useState, useEffect } from "react";

import ShowRows from "./ShowRows.js";
import "./Rows.css";

const Rows = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listOfQs, setListOfQs] = useState([]);
  const [showList, setShowList] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  /*
  const startEditingHandler = () => {
    setIsEditing(true);
    fetch("http://localhost:8081/questions/getall")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfQs([...new Set(data.map((option) => option))]);
        console.log(data);
      });
  };
  */
  const startEditingHandler = () => {
    setIsEditing(true);
    const sampleList = [
        {id:1, firstname:"Antonio", lastname:"Fernandez", phone: "634586366", email:"some@thing.com"},
        {id:2, firstname:"Nolasco", lastname:"Jimenez", phone: "634767366", email:"aaaaaa@thing.com"},
        {id:3, firstname:"Federico", lastname:"Lomonaco", phone: "643586366", email:"dude@thing.com"}
    ];
    setListOfQs(sampleList);
  };

  useEffect(() => {
    if (listOfQs.length !== 0) {
        setIsEditing(true);
        setShowList(true);
      }
  }, [listOfQs]);

  const reFetchData = () => {
    fetch("http://localhost:8081/questions/getall")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfQs([...new Set(data.map((option) => option))]);
        console.log(data);
      });
  }

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Access the database</button>
      )}
      {(isEditing && showList) && (
        <ShowRows
          questionlist={listOfQs}
          onReloadData={reFetchData}
        />
      )}
    </div>
  );
};

export default Rows;
