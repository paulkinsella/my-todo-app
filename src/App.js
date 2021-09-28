import { useEffect, useState } from "react";
import './App.css';
import Sun from "./SVG/Sun";
import Moon from "./SVG/Moon";
import Tick from './SVG/Tick';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [taskComplete, setTaskIsComplete] = useState(false);
  const [seeCompleted, setSeeCompleted] = useState(false);

  const seeComplete = () => {
    return setSeeCompleted(!seeCompleted);
  };
  // const [data, setData] = useState([]);
  // const url = './data.json';

  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       setTodoList([...data, ...todoList, {
  //         text: userInput,
  //         isComplete: taskComplete
  //       }]);
  //     });
  // }, []);
  // console.log("data", data);


  const handleClick = () => {
    setDarkTheme(!darkTheme);
  };

  const taskStatus = () => {
    setTaskIsComplete(true);
  };

  const addItem = () => {
    setTodoList([...todoList, {
      text: userInput,
      isComplete: taskComplete
    }]);
    setTaskIsComplete(false);
  };


  const getItems = () => {
    return todoList.map((item, index) => (
      <ul className="custom-ul" key={index}>
        <li className={darkTheme ? "custom-li-dark" : "custom-li"}>
          {item.isComplete ?
            <input type="radio" checked /> :
            <input type="radio" />}
          {item.text}
        </li>
      </ul>
    ));
  };

  const getIsCompleteItems = () => {
    let result = todoList.filter((item) => item.isComplete);
    return result.map((item) => (
      <ul className="custom-ul">
        <li className={darkTheme ? "custom-li-dark" : "custom-li"}>
          {item.isComplete ?
            <input type="radio" checked /> :
            <input type="radio" />}
          {item.text}
        </li>
      </ul>
    ));
  };

  const getIsActiveItems = () => {
    let result = todoList.filter((item) => !item.isComplete);
    return result.map((item) => (
      <ul className="custom-ul">
        <li className={darkTheme ? "custom-li-dark" : "custom-li"}>
          {item.isComplete ?
            <input type="radio" checked /> :
            <input type="radio" />}
          {item.text}
        </li>
      </ul>
    ));
  };


  console.log("TodoList", todoList);
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
            {/* <button onClick={handleClick}>Change Theme</button>{''} */}
            {seeCompleted ? getIsCompleteItems() : getItems()}
            <div className={darkTheme ? "box-options-dark" : "box-options"}>
              <div className="option">{todoList.length} items left</div>
              <div className="option">
                <ul className="option-menu">
                  <li onClick={seeComplete} className="list-item">All</li>
                  <li onClick={seeComplete} className="list-item">Active</li>
                  <li onClick={seeComplete} className="list-item">Completed</li>
                </ul>
              </div>
              <div className="option">Clear Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
