import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";

const Login = () => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [isCredentials, setIsCredentials] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [listEmails, setListEmails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8084/answers/emails")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListEmails([...new Set(data.map((option) => option))]);
      });
  }, []);

  useEffect(() => {
    let result = listEmails.find((user) => user === email);
    if (result !== undefined) {
      setIsRepeat(true);
    } else {
      setIsRepeat(false);
    }
  }, [email]);

  useEffect(() => {
    console.log(listEmails);
  }, [listEmails]);

  useEffect(() => {
    if (email === undefined || email === null || email === "" || userName === undefined || userName === null || userName === "") setIsCredentials(false);
    else setIsCredentials(true);
  }, [email, userName]);

  const goHomeHandler = (event) => {
    event.preventDefault();
    if (isCredentials) {
      if (!isRepeat) {
        navigate("/home", { state: { name: userName, mail: email } });
      } else {
        navigate("/exile");
      }
    } 
  };

  return (
    <div>
      <div className="login_card">
        <Card>
          <form onSubmit={(e) => goHomeHandler(e)}>
            <div>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label>name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
            <button onClick={(e) => goHomeHandler(e)}>Login</button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;