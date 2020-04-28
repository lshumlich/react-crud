import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PersonForm from './components/PersonForm';
import PeopleListClass from './components/PeopleListClass';
import PeopleList from './components/PeopleList';
import LoadingBalls from './components/LoadingBalls'
import funcs from "./business/functions";

function App() {
  // console.log("---App how many times do I run?");

  const [peopleCtrl, setPeopleCtrl] = useState();
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState({ text: "", class: "" });
  const [toShow, setToShow] = useState();
  const [isClass, setIsClass] = useState(false);

  useEffect(() => {
    // This effect will run any time a state variable changes
    console.log('----useEffect: general');
  });

  /*
    This will only run once because the second parm to
    useEffect is what to monitor. In this case it is an emply
    array. The empty array will never change
  */

  useEffect(() => {
    //
    // Load the people from the API only the first time
    //
    console.log("Loading People once we hope.");
    async function fetchData() {
      try {
        startLoadingAnimation();
        const peeps = new funcs.People()
        setPeopleCtrl(peeps);
        await peeps.getPeople();
        setToShow('list');
        userMsg("People Loaded", "status");
        console.log('Data should be loaded');
      } catch (e) {
        userMsg("***** Turn the server on dummy! *****", "error");
        console.log(e);
      } finally {
        endLoadingAnimation();
      }
    }
    fetchData();

  }, []);

  async function onLoadingButton() {

    startLoadingAnimation();

    await new Promise((resolve, reject) =>
      setTimeout(() => {
        endLoadingAnimation();
        resolve("ok");
      }, 2 * 1000));
  }

  function startLoadingAnimation() {
    setLoading(<LoadingBalls />);
  }

  function endLoadingAnimation() {
    setLoading('');
  }

  async function onSave(person) {
    await peopleCtrl.addOrUpdate(person);
    setToShow('list');
  }

  function onCancel(person) {
    setToShow('list');
    userMsg();
  }

  // Add a new person to the list
  const onAdd = () => {
    setPerson(peopleCtrl.getNewPerson());
    setToShow('form');
    userMsg();
  }

  // Show an item from the PeopleList
  function onShow(key) {
    setPerson(peopleCtrl.get(key));
    setToShow('form');
    userMsg();
  }

  function userMsg(msg, type) {
    // set the class based on the type of message
    const cls = (type) ? 'cl' + type : 'clstatus';
    setMessage({ text: msg, class: cls });
  }

  function onIsClass(e) {
    setIsClass(isClass ? false : true);
    console.log("onIsClass", isClass);
  }

  let output;
  if (isClass) {
    output =
      <PeopleListClass />
    console.log('should use class version');
  } else {
    console.log('should use function version');
    if (toShow === "list") {
      output =
        <PeopleList
          people={peopleCtrl.people}
          showOne={onShow}
          onAdd={onAdd}
        />
    } else if (toShow === "form") {
      output =
        <PersonForm
          person={person}
          cancel={onCancel}
          save={onSave}
          userMsg={userMsg}
        />
    }
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <div className={message.class}>{message.text}</div>
        </header>
        <main className="App-main">
          {output}
          {loading}
          <div>
            <span className="clEgg" onClick={onLoadingButton}>...</span>
            <label>
              Class
            <input name="isClass" type="checkbox" checked={isClass} onChange={onIsClass} />
            </label>
            <button>Class</button>
            <button>Class</button>
          </div>
        </main>
      </div>
    );
  }

  export default App;