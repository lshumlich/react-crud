import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PersonForm from './components/PersonForm';
import PeopleList from './components/PeopleList';
import LoadingBalls from './components/LoadingBalls'
import funcs from "./business/functions";

function App() {
  // console.log("---App how many times do I run?");

  const [peopleCtrl, setPeopleCtrl] = useState();
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [messageClass, setMessageClass] = useState();
  const [toShow, setToShow] = useState();

  useEffect(() => {
    // console.log('----useEffect: general');
  });

  // This will only run once
  useEffect(() => {
    // console.log('----useEffect: arePeopleLoaded');
    //
    // Load the people from the API only the first time
    //
    // console.log("Loading People once we hope.");
    async function fetchData() {
      try {
        startLoadingAnimation();
        const peeps = new funcs.People()
        setPeopleCtrl(peeps);
        await peeps.getPeople();
        setToShow('list');
      } catch (e) {
        setMessage("***** Turn the server on dummy! *****");
        console.log("***** We have not turned the server on *****");
        console.log(e);
      } finally {
        endLoadingAnimation();
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log('----useEffect: message', message);
    if (message) {
      setMessageClass('clWarn');
    } else {
      setMessageClass('');
    }
  }, [message]);

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
  }

  // Add a new person to the list
  const onAdd = () => {
    // console.log("App onAdd", peopleCtrl);
    setPerson(peopleCtrl.getNewPerson());
    setToShow('form');
  }

  // Show an item from the PeopleList
  function onShow(key) {
    setPerson(peopleCtrl.get(key));
    setToShow('form');
  }

  // console.log("Just before return in App");

  let output;
  if (toShow === "list") {
    output =
      <PeopleList
        people={peopleCtrl.people}
        showone={onShow}
        onAdd={onAdd}
      />
  } else if (toShow === "form") {
    output =
      <PersonForm
        person={person}
        cancel={onCancel}
        save={onSave}
      />
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
        <div className={messageClass}>{message}</div>
      </header>
      <main className="App-main">
        {output}
        {loading}
        <span className="clEgg" onClick={onLoadingButton}>...</span>
      </main>
    </div>
  );
}

export default App;