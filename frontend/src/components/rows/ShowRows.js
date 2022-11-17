import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RowElement from "./RowElement";

const ShowRows = (props) => {
  const [rows, setRows] = useState(props.questionlist);
  const [addingRow, setAddingRow] = useState(false);
  const [modRow, setModRow] = useState(false);
  const [modId, setModId] = useState();
  const [deleted, setDeleted] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modname, setModName] = useState("");
  const [modsurname, setModSurname] = useState("");
  const [modemail, setModEmail] = useState("");
  const [modphone, setModPhone] = useState("");

  const removeRow = async (item) => {
    //send request to remove element from database
    const removeRowOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    await fetch("http://localhost:8081/people", removeRowOptions).then(
      (response) => response.json()
    );
    props.onReloadData();
  };

  const modifyRow = (item) => {
    setModRow(!modRow);
    setModId(item);
  };

  const sendModHandler = (event) => {
    event.preventDefault();
    const body = {
      id: modId,
      firstName: modname,
      lastName: modsurname,
      phoneNumber: modphone,
      email: modemail,
    };
    console.log(body);
    const modifyRowOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let res = fetch("http://localhost:8081/people/"+ body.id, modifyRowOptions)
      .then((response) => response.json())
      .then((data) => {
        props.onReloadData();
      });
  };

  useEffect(() => {
    setRows(props.questionlist);
  }, [props]);

  const addRowHandler = () => {
    setAddingRow(!addingRow);
  };

  const renderList = () => {
    return rows.map((item) => (
      <tr key={item.id}>
        <RowElement value={item} />
        <button
          onClick={(e) => {
            removeRow(item.id);
          }}
        >
          delete
        </button>
        <button
          onClick={(e) => {
            modifyRow(item.id);
          }}
        >
          modify
        </button>
      </tr>
    ));
  };

  const sendRowHandler = (event) => {
    event.preventDefault();
    const body = {
      firstName: name,
      lastName: surname,
      phoneNumber: phone,
      email: email,
    };
    console.log(body);
    const addRowOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let res = fetch("http://localhost:8081/people/save", addRowOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.onReloadData();
      });
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
          {renderList()}
        </tbody>
      </table>
      <button onClick={addRowHandler}>Add new row</button>
      {addingRow && (
        <form onSubmit={(e) => sendRowHandler(e)}>
          <div>
            <label>name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></input>
          </div>
          <div>
            <label>phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div>
            <label>email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <button onClick={(e) => sendRowHandler(e)}>send</button>
        </form>
      )}
      {modRow && (
        <form onSubmit={(e) => sendModHandler(e)}>
          <div>
            <label>name</label>
            <input
              type="text"
              value={modname}
              onChange={(e) => setModName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>surname</label>
            <input
              type="text"
              value={modsurname}
              onChange={(e) => setModSurname(e.target.value)}
            ></input>
          </div>
          <div>
            <label>phone</label>
            <input
              type="text"
              value={modphone}
              onChange={(e) => setModPhone(e.target.value)}
            ></input>
          </div>
          <div>
            <label>email</label>
            <input
              type="text"
              value={modemail}
              onChange={(e) => setModEmail(e.target.value)}
            ></input>
          </div>
          <button onClick={(e) => sendModHandler(e)}>send changes</button>
        </form>
      )}
    </div>
  );
};

export default ShowRows;
