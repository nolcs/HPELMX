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
    fetch("http://localhost:8081/people/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfQs([...new Set(data.map((option) => option))]);
      });
  };

  useEffect(() => {
    if (listOfQs.length !== 0) {
      setIsEditing(true);
      setShowList(true);
    }
  }, [listOfQs]);

  const reFetchData = async () => {
    setShowList(false);
    await fetch("http://localhost:8081/people/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfQs([...new Set(data.map((option) => option))]);
      });
  };

  const renderRows = () => {
    return (<ShowRows questionlist={listOfQs} onReloadData={reFetchData} />);
  }

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Access the database</button>
      )}
      {(isEditing && showList) && (
        renderRows()
      )}
    </div>
  );
};

export default Rows;
