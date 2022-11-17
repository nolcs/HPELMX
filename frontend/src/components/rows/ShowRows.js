import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RowElement from "./RowElement";

const ShowRows = (props) => {
  const [rows, setRows] = useState(props.questionlist);
  const [addingRow, setAddingRow] = useState(false);

  const removeRow = (item) => {
    //send request to remove element from database
    const removeRowOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.id),
    };
    let res = fetch("http://localhost:8084/answers", removeRowOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    props.onReloadData();
  };

  const addRowHandler = () => {
    setAddingRow(true);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr key={"header"}>
            {Object.keys(rows[0]).map((key) => (
              <th>{key}</th>
            ))}
          </tr>
          {rows.map((item) => (
            <tr key={item.id}>
              <RowElement value={item} />
              <button onClick={removeRow(item)}>delete</button>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRowHandler}>Add new row</button>
      (addingRow &&
      <form>
        <div>
          <label>name</label>
          <input type="text"></input>
        </div>
        <div>
          <label>surname</label>
          <input type="text"></input>
        </div>
        <div>
          <label>phone</label>
          <input type="text"></input>
        </div>
        <div>
          <label>email</label>
          <input type="text"></input>
        </div>
      </form>
      )
    </div>
  );
};

export default ShowRows;
