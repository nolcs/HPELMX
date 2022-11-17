import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RowElement from "./RowElement";

const ShowRows = (props) => {
  const [rows, setRows] = useState(props.questionlist);

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

  return (<div>
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
    <button >Add new row</button>
    </div>
  );
};

export default ShowRows;
