import { useEffect, useState } from "react";
import './App.css';
import Sun from "./SVG/Sun";
import Moon from "./SVG/Moon";
import Tick from './SVG/Tick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [taskComplete, setTaskComplete] = useState(false);
  const [seeCompleted, setSeeCompleted] = useState(false);
  const [completeValueRecieved, setCompleteValueRecieved] = useState(false);
  const [data, setData] = useState([]);
  const url = 'https://6158b1bd5167ba00174bbbb2.mockapi.io/test';
  const name = 'Paul';

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log("data", data);

  const date = new Date();
  console.log("Date", date);

  const postItem = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "createdAt": date,
        "name": name,
        "avatar": "https://cdn.fakercloud.com/avatars/spacewood__128.jpg",
        "text": userInput,
        "isComplete": taskComplete,
        "id": data.length + 1
      })
    })
      .then(data => data.json());
  };

  // const deleteItem = (item) => {
  //   fetch(url + '/' + item.id, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "createdAt": date,
  //       "name": name,
  //       "avatar": "https://cdn.fakercloud.com/avatars/spacewood__128.jpg",
  //       "text": item.text,
  //       "isComplete": completeValueRecieved,
  //       "id": item.id
  //     }),
  //   });
  // };

  const updateItem = (item) => {
    setCompleteValueRecieved(!completeValueRecieved);
    console.log("Test", completeValueRecieved);
    fetch(url + '/' + item.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "createdAt": date,
        "name": name,
        "avatar": "https://cdn.fakercloud.com/avatars/spacewood__128.jpg",
        "text": item.text,
        "isComplete": true,
        "id": item.id
      }),
    });
  };

  const seeComplete = () => {
    return setSeeCompleted(!seeCompleted);
  };


  const handleClick = () => {
    setDarkTheme(!darkTheme);
  };

  const taskStatus = () => {
    setTaskComplete(true);
  };

  const addItem = () => {
    setData([...data, {
      text: userInput,
      isComplete: taskComplete
    }]);
    setTaskComplete(false);
    postItem();
  };

  const clear = () => {
    console.log("Click");
    setData([]);
  };


  const getItems = () => {
    return data.map((item, index) => (
      <ul className="custom-ul" key={index}>
        <li className={darkTheme ?
          "custom-li-dark" : "custom-li"}>
          <div className="li-content-container">{item.isComplete ?
            <div className="done-container"> <FontAwesomeIcon color={'#2fa305'} icon={faCheckCircle} /></div> :
            <button onClick={() => {
              updateItem(item);
            }}>Set Done </button>}
          </div>
          <div className="li-content-container">
            {item.text}
          </div>
          <div className="li-content-container">
            <div className="delete-container">  <FontAwesomeIcon
              color={'#e81031'}
              icon={faTrash} /></div>
          </div>
        </li>

      </ul >
    ));
  };


  const getIsCompleteItems = () => {
    let result = data.filter((item) => item.isComplete);
    return result.map((item, index) => (
      <ul className="custom-ul" key={index}>
        <li className={darkTheme ?
          "custom-li-dark" : "custom-li"}>
          <div className="li-content-container">{item.isComplete ?
            <FontAwesomeIcon color={'#2fa305'} icon={faCheckCircle} size={"10x"} /> :
            <button onClick={() => {
              updateItem(item);
            }}>Set Done </button>}
          </div>
          <div className="li-content-container">
            {item.text}
          </div>
          <div className="li-content-container">
            <FontAwesomeIcon
              color={'#e81031'}
              icon={faTrash} />
          </div>
        </li>

      </ul >
    ));
  };


  return (
    <div className="App">
      <div className="app-container">
        <div className={darkTheme ? 'header-image-container-dark' : 'header-image-container-light'}>
          <div className="header-container">
            <div className="top-container">
              <div className="title">TODO</div>
              <div className="button-container">
                {darkTheme ?
                  <button
                    className="custom-button"
                    onClick={handleClick}
                  >
                    <Sun />
                  </button> :
                  <button
                    className="custom-button"
                    onClick={handleClick}
                  >
                    <Moon />
                  </button>}
              </div>
            </div>
            <div className="input-container">
              <button
                className="task-complete-button"
                onClick={taskStatus}
              ><Tick />
              </button>
              <input onChange={(e) => {
                setUserInput(e.target.value);
              }} className={darkTheme ? 'todo-input-dark' : 'todo-input-light'} placeholder="type here" />
              <button className={darkTheme ? "submitButton-dark" : "submitButton"} onClick={addItem}>Add</button>
            </div>
          </div>
        </div>
        <div className={darkTheme ? 'app-content-dark' : 'app-content'}>
          <div className={darkTheme ? "content-container-dark" : 'content-container-light'}>
            {seeCompleted ? getIsCompleteItems() : getItems()}
            <hr></hr>
            <div className={darkTheme ? "box-options-dark" : "box-options"}>
              <div className="option">{data.length} items left</div>
              <div className="option">
                <ul className="option-menu">
                  <li onClick={seeComplete} className="list-item">All</li>
                  <li onClick={seeComplete} className="list-item">Active</li>
                  <li onClick={seeComplete} className="list-item">Completed</li>
                </ul>
              </div>
              <div className="option"><button onClick={clear}>Clear</button></div>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
